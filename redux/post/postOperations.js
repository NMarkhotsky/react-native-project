import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  doc,
  query,
  where,
  collectionGroup,
  getDoc,
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
  return onSnapshot(collection(db, 'posts'), (snapshot) => {
    const newData = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      const commentsRef = collection(db, 'posts', id, 'comments');
      getDocs(commentsRef).then((commentsSnapshot) => {
        const commentsCount = commentsSnapshot.size;
        newData.push({ id, ...data, commentsCount });
        if (newData.length === snapshot.size) {
          callback(newData);
        }
      });
    });
  });
};

export const getUserPosts = async (setUserPost, authState) => {
  const postsRef = query(
    collection(db, 'posts'),
    where('userId', '==', authState.userId)
  );

  const unsubscribe = onSnapshot(postsRef, (snapshot) => {
    const userPosts = [];
    snapshot.forEach((doc) => {
      const postData = doc.data();
      const postId = doc.id;
      const commentsRef = collection(db, 'posts', postId, 'comments');
      getDocs(commentsRef).then((commentsSnapshot) => {
        const commentsCount = commentsSnapshot.size;
        userPosts.push({ id: postId, ...postData, commentsCount });
        if (userPosts.length === snapshot.size) {
          setUserPost(userPosts);
        }
      });
    });
  });

  return unsubscribe;
};
