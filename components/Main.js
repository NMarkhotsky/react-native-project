import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { router } from '../routes/router';
import { useAuth } from '../hooks/useAuth';
import { authStateChangeUser } from '../redux/auth/authOperations';

const MainStack = createStackNavigator();

export const Main = () => {
  const {
    authState: { stateChange },
  } = useAuth();
  const dispatch = useDispatch();

  const routing = router(stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="LoginScreen">
        {routing}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
