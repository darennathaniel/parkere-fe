import React, {useEffect, useRef, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {alertRain, centerView} from './services';
import {forecastAlert} from './alert';
import {setFilteredCarparks} from '../../slices/carparkSlice';
import * as Location from 'expo-location';
import PopUp from '../common/errorModal';

export default function Home(props) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const location = useSelector(state => state.isLogged.location);
  const carparks = useSelector(state => state.carparks.data);

  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          props.navigation.navigate('Search');
          return;
        }

        let currLocation = await Location.getCurrentPositionAsync({});
        alertRain(dispatch, setFilteredCarparks, forecastAlert, currLocation);
      } catch (err) {
        setErrMsg(err.response.message);
        setShowErr(true);
      }
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
      <PopUp show={showErr} setShow={setShowErr} message={errMsg} />
    </SafeAreaView>
  );
}
