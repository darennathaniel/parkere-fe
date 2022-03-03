import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import Search from './screens/search';
import LoginScreen from './stacks/login';
import Profile from './screens/profile';
import {getToken} from './screens/common/authorization';
import {useSelector} from 'react-redux';

const Root = createBottomTabNavigator();

export default function AppRoute() {
  const isLogged = useSelector(state => state.isLogged.value);
  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home">
        <Root.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
        <Root.Screen
          component={Search}
          name="Search"
          options={{headerShown: false}}
        />
        {isLogged ? (
          <Root.Screen
            component={Profile}
            name="Profile"
            options={{headerShown: false, tabBarLabel: 'Profile'}}
          />
        ) : (
          <Root.Screen
            component={LoginScreen}
            name="LoginScreen"
            options={{headerShown: false, tabBarLabel: 'Login'}}
          />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}
