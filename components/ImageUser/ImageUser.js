import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const ImageUser = ({ state: { photoURL }, onPress, onDelete }) => {
  const imageSource = photoURL !== null ? { uri: photoURL } : null;

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
          onPress={() => onDelete((prev) => ({ ...prev, photoURL: null }))}
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
    left: '50%',
    transform: [{ translateX: -45 }],
    top: -60,
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
