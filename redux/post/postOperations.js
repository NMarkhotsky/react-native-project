import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';

export const uploadPhotoToServer = async (capturedPhoto) => {
  try {
    const response = await fetch(capturedPhoto);
    const file = await response.blob();
    const uniqueImageId = Date.now().toString();

    const dataRef = await ref(storage, `images/${uniqueImageId}`);

    await uploadBytesResumable(dataRef, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `images/${uniqueImageId}`)
    );

    return processedPhoto;
  } catch (error) {
    console.log(error);
  }
};

export const writeDataToFirestore = async (data) => {
  try {
    const dataRef = await addDoc(collection(db, 'posts'), { ...data });

    return dataRef;
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromFirestore = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });

  return unsubscribe;
};
