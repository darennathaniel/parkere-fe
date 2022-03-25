import React, {useEffect, useRef} from 'react';
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
import {setLocation} from '../../slices/isLoggedSlice';

export default function Home(props) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const location = useSelector(state => state.isLogged.location);

  const carparks = useSelector(state => state.carparks.data);
  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        props.navigation.navigate('Search');
        return;
      }

      let currLocation = await Location.getCurrentPositionAsync({});
      dispatch(
        setLocation({
          location: {
            lat: currLocation.coords.latitude,
            lng: currLocation.coords.longitude,
          },
          search: {
            lat: currLocation.coords.latitude,
            lng: currLocation.coords.longitude,
          },
        }),
      );

      alertRain(dispatch, setFilteredCarparks, forecastAlert, currLocation);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {location.lat !== 0 && location.lng !== 0 ? (
          <>
            <MapView
              style={styles.map}
              ref={ref}
              initialRegion={{
                latitude: Number(location.lat),
                longitude: Number(location.lng),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              <Marker
                coordinate={{
                  latitude: Number(location.lat),
                  longitude: Number(location.lng),
                }}
                pinColor="black">
                <Callout>
                  <Text>This is you!</Text>
                </Callout>
              </Marker>
              {carparks.map(carpark => {
                return (
                  <Marker
                    key={carpark.park_number}
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
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </SafeAreaView>
  );
}
