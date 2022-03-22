import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';

import Carpark from '../screens/carpark';
import Home from '../screens/home';
import Map from '../screens/search/map';

const HomeStack = createNativeStackNavigator();

export default function HomeScreen(props) {
  const carparks = useSelector(state => state.carparks.data);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      {carparks.map(carpark => {
        return (
          <HomeStack.Screen
            key={carpark._id}
            name={carpark.park_number}
            component={Carpark}
            options={{headerShown: false}}
            initialParams={{carpark: carpark}}
          />
        );
      })}
      <HomeStack.Screen
        name="Map"
        component={Map}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
