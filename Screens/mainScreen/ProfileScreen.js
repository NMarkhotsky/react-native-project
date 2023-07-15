import { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import backgroundImage from '../../assets/images/background.png';
import { ImageUser } from '../../components/ImageUser/ImageUser';
import { useAuth } from '../../hooks/useAuth';
import {
  authSignOutUser,
  uploadAvatarToServer,
  removeUserAvatar,
} from '../../redux/auth/authOperations';
import { db } from '../../firebase/config';
import { Feather } from '@expo/vector-icons';
import { useEffect } from 'react';

export const ProfileScreen = ({ route, navigation }) => {
  const [userPost, setUserPost] = useState([]);

  const { height, width } = useWindowDimensions();
  const { authState } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    // const q = query(
    //   collection(db, 'posts'),
    //   where('userId', '==', authState.userId)
    // );
    // const querySnapshot = await getDocs(q);

    // querySnapshot.map((doc) => {
    //   console.log(doc.id, '=>', doc.data());
    // });

    onSnapshot(
      query(collection(db, 'posts'), where('userId', '==', authState.userId)),
      (snapshot) => {
        console.log(snapshot.docs.map((doc) => ({ ...doc.data() })));
        setUserPost(snapshot.docs.map((doc) => ({ ...doc.data() })));
      }
    );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const photoURL = await uploadAvatarToServer(result.assets[0].uri);

      dispatch(removeUserAvatar(photoURL));
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ position: 'absolute', width: width, height: height }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -165 : -165}
        >
          <View style={styles.profileContainer}>
            <View style={styles.infoUserThumb}>
              <ImageUser state={authState} onPress={pickImageAsync} />
              <Text style={styles.infoUserName}>{authState.login}</Text>
              <TouchableOpacity style={{ marginTop: 22 }} onPress={signOut}>
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  profileContainer: {
    height: '85%',
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
  },
  infoUserThumb: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  infoUserName: {
    width: '100%',
    marginTop: 92,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#212121',
  },
});
