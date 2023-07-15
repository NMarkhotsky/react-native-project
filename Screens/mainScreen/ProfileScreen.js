import { useState, useEffect } from 'react';
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
  FlatList,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import backgroundImage from '../../assets/images/background.png';
import { ImageUser } from '../../components/ImageUser/ImageUser';
import { useAuth } from '../../hooks/useAuth';
import {
  authSignOutUser,
  uploadAvatarToServer,
  removeUserAvatar,
} from '../../redux/auth/authOperations';
import { getUserPosts } from '../../redux/post/postOperations';
import { Feather } from '@expo/vector-icons';

export const ProfileScreen = ({ route, navigation }) => {
  const [userPost, setUserPost] = useState([]);
  console.log('userPost: ', userPost);

  const { height, width } = useWindowDimensions();
  const { authState } = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts(setUserPost, authState);
  }, []);

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
    <>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ position: 'absolute', width: width, height: height }}
      />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.infoUserThumb}>
            <ImageUser state={authState} onPress={pickImageAsync} />
            <Text style={styles.infoUserName}>{authState.login}</Text>
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, marginTop: 22 }}
              onPress={signOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <View style={styles.listPost}>
            <FlatList
              data={userPost}
              renderItem={({
                item: {
                  id,
                  photo,
                  namePost,
                  location,
                  convertedCoordinate: { region, country },
                  commentsCount,
                },
              }) => {
                return (
                  <View style={styles.subContainer}>
                    <View style={styles.imageContainer}>
                      <Image source={{ uri: photo }} style={styles.image} />
                    </View>
                    <Text style={[{ ...styles.text, ...styles.namePost }]}>
                      {namePost}
                    </Text>
                    <View style={styles.infoThumb}>
                      <TouchableOpacity
                        style={styles.info}
                        onPress={() =>
                          navigation.navigate('CommentsScreen', {
                            postId: id,
                            photo,
                          })
                        }
                      >
                        <Feather
                          name="message-circle"
                          size={24}
                          color="#BDBDBD"
                          style={[
                            { transform: [{ rotate: '-90deg' }] },
                            commentsCount
                              ? { color: '#FF6C00' }
                              : { color: '#BDBDBD' },
                          ]}
                        />
                        <Text
                          style={[
                            styles.textComment,
                            commentsCount
                              ? { color: '#212121' }
                              : { color: '#BDBDBD' },
                          ]}
                        >
                          {commentsCount}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.info}
                        onPress={() => {
                          navigation.navigate('MapScreen', {
                            photo,
                            namePost,
                            location,
                          });
                        }}
                      >
                        <Feather name="map-pin" size={24} color="#BDBDBD" />
                        <Text
                          style={[{ ...styles.text, ...styles.locationText }]}
                        >
                          {country}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </>
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
    width: '100%',
    marginHorizontal: 'auto',
  },
  listPost: {
    marginTop: 160,
  },

  infoUserName: {
    position: 'absolute',
    width: '100%',
    marginTop: 92,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: '#212121',
  },
  subContainer: {},
  imageContainer: {},
  image: {
    height: 240,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#212121',
  },
  namePost: {
    marginVertical: 8,
    fontFamily: 'Roboto-Medium',
  },
  infoThumb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginBottom: 32,
  },
  textComment: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    textDecorationLine: 'underline',
  },
});
