import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth, storage } from '../../firebase/config';
import { updateUserProfile, authStateChange, authSignOut } from './authSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const authSignUpUser =
  ({ login, email, password, photoURL }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      console.log('user: ', user);

      await updateProfile(user, { displayName: login, photoURL });

      await dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          photoURL,
        })
      );
    } catch (error) {
      console.log('error: ', error, error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log('error: ', error, error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log('error: ', error, error.message);
  }
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserProfile({
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        dispatch(authStateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    console.log('error: ', error, error.message);
  }
};

export const uploadAvatarToServer = async (photoURL) => {
  try {
    const response = await fetch(photoURL);
    const file = await response.blob();
    const uniqueImageId = Date.now().toString();

    const dataRef = await ref(storage, `avatar/${uniqueImageId}`);

    await uploadBytesResumable(dataRef, file);

    const avatarPhoto = await getDownloadURL(
      ref(storage, `avatar/${uniqueImageId}`)
    );

    return avatarPhoto;
  } catch (error) {
    console.log(error);
  }
};

export const removeUserAvatar = (photoURL) => async (dispatch, getState) => {
  try {
    const user = await auth.currentUser;

    await updateProfile(user, { photoURL });

    await dispatch(
      updateUserProfile({
        userId: user.uid,
        login: user.displayName,
        photoURL,
      })
    );
    console.log('user: ', user);
  } catch (error) {
    console.log('error: ', error, error.message);
  }
};
