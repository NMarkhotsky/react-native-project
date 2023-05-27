import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </>
  );
}
