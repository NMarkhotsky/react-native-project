import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import {
  getComments,
  getDataFromFirestore,
} from '../../redux/post/postOperations';

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [post, setPost] = useState([]);

  const { authState } = useAuth();

  useEffect(() => {
    const unsubscribe = getDataFromFirestore((newData) => {
      setPost(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImages}
          source={{ uri: authState.photoURL }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{authState.login}</Text>
          <Text style={styles.profileEmail}>{authState.email}</Text>
        </View>
      </View>
      <FlatList
        data={post}
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
                    navigation.navigate('CommentsScreen', { postId: id, photo })
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
                  >{`${region}, ${country}`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  subContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  imageContainer: {},
  profileImages: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  profileInfo: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
  },
  profileEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
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
