import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostsScreen, CreatePostsScreen, ProfileScreen } from '../mainScreen';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const [tabBarStyle, setTabBarStyle] = useState('flex');

  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',

        headerStyle: {
          borderBottomWidth: 1,
          borderColor: '#E5E5E5',
        },

        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#FF6C00',
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#212121',

        tabBarStyle: {
          display: tabBarStyle,
          height: 83,
          paddingTop: 10,
          paddingBottom: 34,
          paddingHorizontal: 80,
          borderTopWidth: 1,
          borderColor: '#E5E5E5',
        },

        tabBarItemStyle: {
          borderRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="PostsScreen"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      >
        {({ navigation }) => (
          <PostsScreen
            navigation={navigation}
            setTabBarStyle={setTabBarStyle}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => (
            <Text
              style={{
                marginBottom: 10,
                fontFamily: 'Roboto-Medium',
                fontSize: 17,
              }}
            >
              Створити публікацію
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
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => (
            <Feather name="plus" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
