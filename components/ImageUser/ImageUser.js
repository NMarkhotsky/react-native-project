import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { removeUserAvatar } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';

export const ImageUser = ({ state, onPress, onDelete }) => {
  const dispatch = useDispatch();

  const {
    authState: { photoURL },
  } = useAuth();

  const handleRemoveAvatar = () => {
    dispatch(removeUserAvatar(null));
  };

  const imageSource = state.photoURL !== null ? { uri: state.photoURL } : null;

  return (
    <View style={styles.imagePhotoContainer}>
      <Image style={styles.imagePhoto} source={imageSource} />
      {!imageSource ? (
        <TouchableOpacity style={styles.loadPhoto} onPress={onPress}>
          <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.loadPhoto}
          onPress={
            photoURL
              ? handleRemoveAvatar
              : () => onDelete((prev) => ({ ...prev, photoURL: null }))
          }
        >
          <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePhotoContainer: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -55 }],
  },
  imagePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },

  loadPhoto: {
    position: 'absolute',
    right: -12,
    bottom: 14,
  },
});
