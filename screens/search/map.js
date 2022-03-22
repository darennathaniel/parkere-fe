import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {setSearch} from '../../slices/isLoggedSlice';
import mapStyle from '../home/styles';
import {View, TouchableOpacity, Image} from 'react-native';
import {showLocation} from 'react-native-map-link';

export default function Map(props) {
  const sourceCoordinate = useSelector(state => state.isLogged.search);
  const destCoordinate = props.route.params;
  const dispatch = useDispatch();
  return (
    <>
      <MapView
        style={mapStyle.map}
        initialRegion={{
          latitude: sourceCoordinate.lat,
          longitude: sourceCoordinate.lng,
          latitudeDelta: 0.007,
          longitudeDelta: 0.007,
        }}>
        <Marker
          coordinate={{
            latitude: sourceCoordinate.lat,
            longitude: sourceCoordinate.lng,
          }}
          pinColor="black"
          draggable={true}
          onDragEnd={e =>
            dispatch(
              setSearch({
                location: {
                  lat: e.nativeEvent.coordinate.latitude,
                  lng: e.nativeEvent.coordinate.longitude,
                },
              }),
            )
          }></Marker>
      </MapView>
      <View style={mapStyle.centerButton}>
        <TouchableOpacity
          style={[mapStyle.circleBg, {bottom: -60}]}
          onPress={() => {
            showLocation({
              latitude: destCoordinate.latitude,
              longitude: destCoordinate.longitude,
              sourceLatitude: sourceCoordinate.lat,
              sourceLongitude: sourceCoordinate.lng,
            });
            props.navigation.goBack();
          }}>
          <Image
            source={require('./assets/search.png')}
            style={{width: 40, height: 40}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
