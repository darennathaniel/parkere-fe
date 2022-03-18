import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './styles';
import MapView, {Callout, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useDispatch, useSelector} from 'react-redux';
import {alertRain, centerView} from './services';
import {forecastAlert} from './alert';
import {setFilteredCarparks} from '../../slices/carparkSlice';

export default function Home(props) {
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const carparks = useSelector(state => state.carparks.data);
  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        props.navigation.navigate('Search');
        return;
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      setLocation(currLocation);

      alertRain(dispatch, setFilteredCarparks, forecastAlert, currLocation);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {location ? (
          <MapView
            style={styles.map}
            ref={ref}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
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
                      onPress={() =>
                        props.navigation.navigate(carpark.park_number)
                      }>
                      <Text>
                        {carpark.park_address} ({carpark.park_number})
                      </Text>
                    </TouchableOpacity>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
        ) : (
          <ActivityIndicator size="large" />
        )}
        <View style={styles.centerButton}>
          <TouchableOpacity
            style={styles.circleBg}
            onPress={() => {
              centerView(ref, location);
            }}>
            <Image
              source={require('./assets/location.png')}
              style={styles.locationImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
