// export const pickImageAsync = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//     allowsEditing: true,
//     quality: 1,
//   });

//   if (!result.canceled) {
//     const photoURL = await uploadAvatarToServer(result.assets[0].uri);
//     console.log('photoURL: ', photoURL);

//     setState((prev) => ({ ...prev, photoURL }));
//   } else {
//     alert('You did not select any image.');
//   }
// };
