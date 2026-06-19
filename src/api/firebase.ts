import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { FIREBASE_CONFIG } from '@/utils/constants';

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Auth
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};
export const logoutUser = async () => { await signOut(auth); };
export const getCurrentUser = () => new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe();
    resolve(user);
  });
});

// RSVP
export interface RSVPRecord {
  id?: string;
  guestName: string;
  attending: 'yes' | 'no';
  pax: number;
  message: string;
  slug: string;
  createdAt: Timestamp;
}
export const saveRSVP = async (data: Omit<RSVPRecord, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'rsvps'), { ...data, createdAt: Timestamp.now() });
  return docRef.id;
};
export const getRSVPsBySlug = async (slug: string) => {
  const q = query(collection(db, 'rsvps'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as RSVPRecord));
};

// Guest Book
export interface GuestBookEntry {
  id?: string;
  name: string;
  message: string;
  slug: string;
  createdAt: Timestamp;
}
export const saveGuestBookEntry = async (data: Omit<GuestBookEntry, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'guestbook'), { ...data, createdAt: Timestamp.now() });
  return docRef.id;
};
export const getGuestBookEntries = async (slug: string) => {
  const q = query(collection(db, 'guestbook'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as GuestBookEntry));
};

// Check-in
export interface CheckinRecord {
  id?: string;
  guestName: string;
  slug: string;
  checkinTime: Timestamp;
}
export const saveCheckin = async (data: Omit<CheckinRecord, 'id' | 'checkinTime'>) => {
  const docRef = await addDoc(collection(db, 'checkins'), { ...data, checkinTime: Timestamp.now() });
  return docRef.id;
};
export const getCheckinsBySlug = async (slug: string) => {
  const q = query(collection(db, 'checkins'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CheckinRecord));
};

// Cloudinary Upload (via fetch)
export interface UploadedImage {
  url: string;
  thumbnailUrl: string;
  publicId: string;
  secureUrl: string;
}
export const uploadImageToCloudinary = async (file: File, folder?: string) => {
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  if (!uploadPreset || !cloudName) {
    throw new Error('Cloudinary configuration is missing');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // sekarang pasti string
  if (folder) formData.append('folder', folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!res.ok) throw new Error('Upload gagal');
  const data = await res.json();

  return {
    url: data.secure_url,
    thumbnailUrl: data.secure_url.replace('/upload/', '/upload/w_200,h_200,c_fill/'),
    publicId: data.public_id,
    secureUrl: data.secure_url,
  };
};