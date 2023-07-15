import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import {
  uploadPhotoToServer,
  writeDataToFirestore,
} from '../../redux/post/postOperations';
import { useAuth } from '../../hooks/useAuth';

export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [convertedCoordinate, setConvertedCoordinate] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [namePost, setNamePost] = useState('');
  const [isDisabledPublishBtn, setIsDisabledPublishBtn] = useState(false);

  const {
    authState: { userId },
  } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const disabled =
      capturedPhoto !== null &&
      namePost !== '' &&
      convertedCoordinate !== null &&
      location !== null
        ? false
        : true;

    setIsDisabledPublishBtn(disabled);
  }, [capturedPhoto, namePost, convertedCoordinate, location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled && result.assets.length > 0) {
      await MediaLibrary.createAssetAsync(result.assets[0].uri);
      setCapturedPhoto(result.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const { region, country } = address[0];

      setConvertedCoordinate({ region, country });
    }
  };
  const openGallery = async () => {
    const galleryResult = await ImagePicker.launchImageLibraryAsync();

    if (!galleryResult.canceled && galleryResult.assets.length > 0) {
      setCapturedPhoto(galleryResult.assets[0].uri);

      const { coords } = await Location.getCurrentPositionAsync();
      setLocation(coords);

      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      const { region, country } = address[0];

      setConvertedCoordinate({ region, country });
    }
  };

  const publishPhoto = async () => {
    if (location) {
      const photo = await uploadPhotoToServer(capturedPhoto);

      await writeDataToFirestore({
        photo,
        namePost,
        location,
        convertedCoordinate,
        userId,
      });

      navigation.navigate('DefaultPostsScreen');

      setCapturedPhoto(null);
      setNamePost('');
      setLocation(null);
      setConvertedCoordinate(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={styles.cameraContainer}>
            <View style={styles.cameraIconContainer}>
              <TouchableOpacity style={styles.cameraIcon} onPress={openCamera}>
                <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            {capturedPhoto ? (
              <Image
                style={styles.previewImage}
                source={{ uri: capturedPhoto }}
              />
            ) : (
              <Camera style={styles.camera} />
            )}
          </View>

          <TouchableOpacity onPress={openGallery}>
            <Text style={styles.cameraText}>
              {capturedPhoto ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Назва..."
              placeholderTextColor="#BDBDBD"
              value={namePost.trimStart()}
              onChangeText={setNamePost}
            />
            <TextInput
              style={{ ...styles.input, marginTop: 16 }}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              value={
                convertedCoordinate
                  ? `${convertedCoordinate.region}, ${convertedCoordinate.country}`
                  : null
              }
            />
            <TouchableOpacity
              style={
                isDisabledPublishBtn
                  ? {
                      ...styles.button,
                      backgroundColor: '#F6F6F6',
                      color: '#BDBDBD',
                    }
                  : { ...styles.button, backgroundColor: '#FF6C00' }
              }
              disabled={isDisabledPublishBtn}
              onPress={publishPhoto}
            >
              <Text
                style={
                  isDisabledPublishBtn
                    ? {
                        ...styles.buttonTitle,
                        color: '#BDBDBD',
                      }
                    : { ...styles.buttonTitle, color: '#FFFFFF' }
                }
              >
                {location || !capturedPhoto
                  ? 'Опублікувати'
                  : 'Завантаження...'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 34,
          }}
        >
          <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => {
              setCapturedPhoto(null);
              setNamePost('');
              setConvertedCoordinate(null);
              console.log('Delete');
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraContainer: {
    position: 'relative',
    marginTop: 32,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cameraIconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    zIndex: 1,
  },
  cameraIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFFFFF4D',
  },
  camera: {
    height: 240,
  },
  cameraText: {
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  inputContainer: {
    marginTop: 32,
  },
  input: {
    gap: 16,
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    borderBottomColor: '#E8E8E8',
    color: '#212121',
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 32,
    borderRadius: 100,
  },

  buttonTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 19,
  },
  previewImage: {
    height: 240,
    borderRadius: 8,
  },
  buttonDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F6F6',
  },
});
