import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './stacks/login';
import ProfileScreen from './stacks/profile';
import SearchScreen from './stacks/search';
import HomeScreen from './stacks/home';
import {useDispatch, useSelector} from 'react-redux';

import {getAllCarpark} from './screens/search/services';
import {setCarparks} from './slices/carparkSlice';
import {Image} from 'react-native';

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
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: () => {
              return (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('./assets/image/home.png')}
                />
              );
            },
          }}
        />
        <Root.Screen
          component={SearchScreen}
          name="SearchScreen"
          options={{
            headerShown: false,
            tabBarLabel: 'Search',
            tabBarIcon: () => {
              return (
                <Image
                  style={{width: 25, height: 25}}
                  source={require('./screens/search/assets/search.png')}
                />
              );
            },
          }}
        />
        {isLogged.value ? (
          <Root.Screen
            component={ProfileScreen}
            name="ProfileScreen"
            options={{
              headerShown: false,
              tabBarLabel: isLogged.name,
              tabBarIcon: () => {
                return (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('./assets/image/user.png')}
                  />
                );
              },
            }}
          />
        ) : (
          <Root.Screen
            component={LoginScreen}
            name="LoginScreen"
            options={{
              headerShown: false,
              tabBarLabel: 'Login',
              tabBarIcon: () => {
                return (
                  <Image
                    style={{width: 25, height: 25}}
                    source={require('./assets/image/login.png')}
                  />
                );
              },
            }}
          />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}
