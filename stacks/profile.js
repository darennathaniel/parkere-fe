import React from 'react';
import {useSelector} from 'react-redux';
import Profile from '../screens/profile';
import Carpark from '../screens/carpark';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ProfileStack = createNativeStackNavigator();

export default function ProfileScreen(props) {
  const carparks = useSelector(state => state.isLogged.favorite);
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      {carparks.map(carpark => {
        return (
          <ProfileStack.Screen
            key={carpark._id}
            name={carpark.park_number}
            component={Carpark}
            options={{headerShown: false}}
            initialParams={{carpark: carpark}}
          />
        );
      })}
    </ProfileStack.Navigator>
  );
}
