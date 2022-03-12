import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Carpark from '../screens/carpark';
import {useSelector} from 'react-redux';
import Home from '../screens/home';

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
    </HomeStack.Navigator>
  );
}
