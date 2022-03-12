import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import MapView, {Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';

export default function Home() {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  const carparks = useSelector(state => state.carparks.data);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        navigation.navigate('SearchScreen');
        return;
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      setLocation(currLocation);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              pinColor="black">
              <Callout>
                <Text>This is you!</Text>
              </Callout>
            </Marker>
            {carparks.map(carpark => {
              return (
                <Marker
                  key={carpark._id}
                  coordinate={{
                    latitude: Number(carpark.lat),
                    longitude: Number(carpark.lon),
                  }}>
                  <Callout
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(carpark.park_number)}>
                      <Text>This is carpark {carpark.park_number}</Text>
                    </TouchableOpacity>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
        ) : (
          <Text>Null</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
