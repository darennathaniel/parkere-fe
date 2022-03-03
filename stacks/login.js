import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login';
import Register from '../screens/register';

const LoginStack = createNativeStackNavigator();

export default function LoginScreen(props) {
  return (
    <LoginStack.Navigator initialRouteName="Login">
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}></LoginStack.Screen>
      <LoginStack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}></LoginStack.Screen>
    </LoginStack.Navigator>
  );
}
