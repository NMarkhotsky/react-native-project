import { collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { publishPost } from './postSlice';

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

export const writeDataToFirestore = async (
  photo,
  namePost,
  location,
  convertedCoordinate
) => {
  try {
    const dataRef = await addDoc(collection(db, 'posts'), {
      photo,
      namePost,
      location,
      convertedCoordinate,
    });
    console.log('Document written with ID: ', dataRef.id);
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromFirestore = async () => {
  try {
    const data = await getDocs(collection(db, 'posts'));

    data.forEach((data) => console.log(data.data()));
  } catch (error) {
    console.log(error);
  }
};
getDataFromFirestore();
