import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Search from '../screens/search';
import Carpark from '../screens/carpark';
import Map from '../screens/search/map';

const SearchStack = createNativeStackNavigator();

export default function SearchScreen(props) {
  const carparks = useSelector(state => state.carparks.data);

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      {carparks.map(carpark => {
        return (
          <SearchStack.Screen
            key={carpark.park_number}
            name={carpark.park_number}
            component={Carpark}
            options={{headerShown: false}}
            initialParams={{carpark: carpark}}
          />
        );
      })}
      <SearchStack.Screen
        name="Map"
        component={Map}
        options={{headerShown: false}}
      />
    </SearchStack.Navigator>
  );
}
