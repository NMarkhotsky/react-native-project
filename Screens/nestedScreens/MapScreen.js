import { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const MapScreen = ({ route: { params }, setTabBarStyle }) => {
  const {
    photo,
    namePost,
    location: { latitude, longitude },
  } = params;

  useEffect(() => {
    setTabBarStyle('none');

    return () => {
      setTabBarStyle('flex');
    };
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker title={namePost} coordinate={{ latitude, longitude }}>
          <Image
            source={{ uri: photo }}
            style={{ width: 50, height: 50, borderRadius: 8 }}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
