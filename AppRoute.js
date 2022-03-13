import React, {useState, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './stacks/login';
import Profile from './screens/profile';
import SearchScreen from './stacks/search';
import HomeScreen from './stacks/home';
import {useDispatch, useSelector} from 'react-redux';

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
      <Root.Navigator initialRouteName="HomeScreen">
        <Root.Screen
          component={HomeScreen}
          name="HomeScreen"
          options={{headerShown: false, tabBarLabel: 'Home'}}
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
