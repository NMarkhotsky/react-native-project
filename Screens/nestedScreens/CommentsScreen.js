import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';

export const CommentsScreen = ({ navigation, setTabBarStyle }) => {
  useLayoutEffect(() => {
    setTabBarStyle('none');

    return () => {
      setTabBarStyle('flex');
    };
  }, []);

  return (
    <View>
      <Text>CommentsScreen</Text>
    </View>
  );
};
