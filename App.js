import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { RegistrationScreen } from './Screens/auth/RegistrationScreen';
import { LoginScreen } from './Screens/auth/LoginScreen';
import { Home } from './Screens/Home/Home';
import { useState } from 'react';

const MainStack = createStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const isLogIn = () => {
    if (!isLogin) {
      return (
        <>
          <MainStack.Screen
            name="RegistrationScreen"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <RegistrationScreen
                navigation={navigation}
                setIsLogin={setIsLogin}
              />
            )}
          </MainStack.Screen>
          <MainStack.Screen name="LoginScreen" options={{ headerShown: false }}>
            {({ navigation }) => (
              <LoginScreen navigation={navigation} setIsLogin={setIsLogin} />
            )}
          </MainStack.Screen>
        </>
      );
    }
    return (
      <MainStack.Screen name="HomeScreen" options={{ headerShown: false }}>
        {({ navigation }) => (
          <Home navigation={navigation} setIsLogin={setIsLogin} />
        )}
      </MainStack.Screen>
    );
  };

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="LoginScreen">
          {isLogIn()}
        </MainStack.Navigator>
      </NavigationContainer>
    </>
  );
}
