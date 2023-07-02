import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  DefaultPostsScreen,
  CommentsScreen,
  MapScreen,
} from '../nestedScreens';

import { Feather } from '@expo/vector-icons';

const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation, setIsLogin, setTabBarStyle }) => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          borderBottomWidth: 1,
          borderColor: '#E5E5E5',
        },
      }}
    >
      <NestedScreen.Screen
        name="DefaultPostsScreen"
        component={DefaultPostsScreen}
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
              }}
            >
              Публікації
            </Text>
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16, marginBottom: 10 }}
              onPress={() => setIsLogin(false)}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="CommentsScreen"
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
              }}
            >
              Коментарі
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, marginBottom: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        }}
      >
        {({ route, navigation }) => (
          <CommentsScreen
            route={route}
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
      </NestedScreen.Screen>
      <NestedScreen.Screen
        name="MapScreen"
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
              }}
            >
              Мапа
            </Text>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, marginBottom: 10 }}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
        }}
      >
        {({ route, navigation }) => (
          <MapScreen
            route={route}
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
      </NestedScreen.Screen>
    </NestedScreen.Navigator>
  );
};
