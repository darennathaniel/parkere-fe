import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Search from '../screens/search';
import Carpark from '../screens/carpark';
import {useSelector} from 'react-redux';

const SearchStack = createNativeStackNavigator();

export default function SearchScreen(props) {
  const carparks = useSelector(state => state.carparks.data);

  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}></SearchStack.Screen>
      {carparks.map(carpark => {
        return (
          <SearchStack.Screen
            key={carpark._id}
            name={carpark.park_number}
            component={Carpark}
            options={{headerShown: false}}
            initialParams={{carpark: carpark}}
          />
        );
      })}
    </SearchStack.Navigator>
  );
}
