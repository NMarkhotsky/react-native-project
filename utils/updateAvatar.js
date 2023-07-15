// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
//   signOut,
// } from 'firebase/auth';
// import { auth, storage } from '../../firebase/config';
// import { updateUserProfile, authStateChange, authSignOut } from './authSlice';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

// export const updateUserAvatar = (data, photoURL) => async (dispatch, getState) => {
//   try {
//     const user = await auth.currentUser;

//     await updateProfile(user, { ...data, photoURL });

//     await dispatch(
//       updateUserProfile({
//         ...data,
//         photoURL,
//       })
//     );
//   } catch (error) {
//     console.log('error: ', error, error.message);
//   }
// };

// export const updateUserAvatar = async (data, photoURL) => {
//   const dispatch = useDispatch();

//   const user = await auth.currentUser;

//   await updateProfile(user, { ...data, photoURL });

//   await dispatch(
//     updateUserProfile({
//       ...data,
//       photoURL,
//     })
//   );
// };
