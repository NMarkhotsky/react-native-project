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

export const DefaultPostsScreen = ({ route: { params }, navigation }) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (params) setPost((prevState) => [...prevState, params]);
  }, [params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={post}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({
          item: {
            capturedPhoto,
            namePost,
            location,
            convertedCoordinate: { region, country },
          },
        }) => {
          return (
            <View style={styles.subContainer}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: capturedPhoto }} style={styles.image} />
              </View>
              <Text style={[{ ...styles.text, ...styles.namePost }]}>
                {namePost}
              </Text>
              <View style={styles.infoThumb}>
                <TouchableOpacity
                  style={styles.info}
                  onPress={() => navigation.navigate('CommentsScreen')}
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                  <Text style={styles.textComment}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.info}
                  onPress={() => {
                    navigation.navigate('MapScreen', {
                      capturedPhoto,
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
  },
  subContainer: {
    marginTop: 32,
    marginBottom: 34,
    paddingHorizontal: 16,
  },
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
