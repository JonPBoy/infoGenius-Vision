import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Auth Helpers
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create user profile if it doesn't exist
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isAdmin: user.email === 'jonpboy@gmail.com', // Seed admin
        createdAt: serverTimestamp()
      });
    }
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => signOut(auth);

// Infographic Helpers
export const saveInfographic = async (infographicData: any) => {
  const id = infographicData.id || doc(collection(db, 'infographics')).id;
  const path = `infographics/${id}`;
  
  const userId = auth.currentUser ? auth.currentUser.uid : 'guest';
  const payload = {
    id,
    userId,
    imageUrl: infographicData.data || infographicData.imageUrl || '',
    prompt: infographicData.prompt || 'Infographic',
    title: infographicData.title || infographicData.prompt || 'Infographic',
    level: infographicData.level || 'High School',
    style: infographicData.style || 'Default',
    language: infographicData.language || 'English',
    artForm: infographicData.artForm || 'None',
    hotspots: infographicData.hotspots || [],
    annotations: infographicData.annotations || [],
    annotationHistoryStates: infographicData.annotationHistoryStates || [],
    historyIndex: infographicData.historyIndex || 0,
    isPublic: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'infographics', id), payload, { merge: true });
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getInfographicById = async (id: string) => {
  const path = `infographics/${id}`;
  try {
    const docRef = doc(db, 'infographics', id);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const generateShareableLink = async (infographicData: any): Promise<{ id: string; shareUrl: string }> => {
  const id = await saveInfographic(infographicData);
  if (!id) throw new Error('Failed to generate unique identifier for infographic');
  
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const shareUrl = `${origin}${pathname}?v=${id}`;
  
  // Update address bar seamlessly without refreshing
  try {
    window.history.replaceState(null, '', shareUrl);
  } catch (e) {
    // Ignore iframe navigation sandbox restrictions if any
  }

  return { id, shareUrl };
};

export const getUserInfographics = (userId: string, callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'infographics'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'infographics');
  });
};

export const getAllInfographics = (callback: (data: any[]) => void) => {
  const q = query(
    collection(db, 'infographics'),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(items);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'infographics');
  });
};
