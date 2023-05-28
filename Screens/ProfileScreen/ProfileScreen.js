import { View, Text, ImageBackground, useWindowDimensions } from 'react-native';
import backgroundImage from '../../assets/images/background.png';

export const ProfileScreen = ({}) => {
  const { height, width } = useWindowDimensions();

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={{ position: 'absolute', width: width, height: height }}
    />
  );
};
