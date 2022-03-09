import React, {useState, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/home';
import LoginScreen from './stacks/login';
import Profile from './screens/profile';
import {useDispatch, useSelector} from 'react-redux';
import SearchScreen from './stacks/search';

import {getAllCarpark} from './screens/search/services';
import {setCarparks} from './slices/carparkSlice';

const Root = createBottomTabNavigator();

export default function AppRoute() {
  const isLogged = useSelector(state => state.isLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllCarpark()
      .then(res => {
        dispatch(setCarparks({data: res.data.data}));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home">
        <Root.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
        <Root.Screen
          component={SearchScreen}
          name="SearchScreen"
          options={{headerShown: false, tabBarLabel: 'Search'}}
        />
        {isLogged.value ? (
          <Root.Screen
            component={Profile}
            name="Profile"
            options={{headerShown: false, tabBarLabel: isLogged.name}}
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
