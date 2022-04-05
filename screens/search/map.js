import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import {setSearch} from '../../slices/isLoggedSlice';
import mapStyle from '../home/styles';
import {View, TouchableOpacity, Image, Text, SafeAreaView} from 'react-native';
import {showLocation} from 'react-native-map-link';
import topNav from '../register/styles';

export default function Map(props) {
  const sourceCoordinate = useSelector(state => state.isLogged.search);
  const [markers, setMarkers] = useState(sourceCoordinate);
  const destCoordinate = props.route.params;
  const dispatch = useDispatch();
  return (
    <>
      <SafeAreaView style={[{height: 75}, topNav.topNavigation]}>
        <View style={topNav.topLeftNavigation}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={[topNav.topMiddleNavigation, {width: '40%'}]}>
          <Text>Click or Drag the Marker!</Text>
        </View>
        <View style={topNav.topRightNavigation}></View>
      </SafeAreaView>
      <MapView
        style={mapStyle.map}
        onPress={e =>
          setMarkers({
            lat: e.nativeEvent.coordinate.latitude,
            lng: e.nativeEvent.coordinate.longitude,
          })
        }
        initialRegion={{
          latitude:
            (Number(destCoordinate.latitude) + sourceCoordinate.lat) / 2,
          longitude:
            (Number(destCoordinate.longitude) + sourceCoordinate.lng) / 2,
          latitudeDelta:
            (Number(destCoordinate.latitude) - sourceCoordinate.lat) * 1.7,
          longitudeDelta:
            (Number(destCoordinate.longitude) - sourceCoordinate.lng) * 1.7,
        }}>
        <Marker
          coordinate={{
            latitude: markers.lat,
            longitude: markers.lng,
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
          }
        />
        <Marker
          coordinate={{
            latitude: Number(destCoordinate.latitude),
            longitude: Number(destCoordinate.longitude),
          }}
        />
      </MapView>
      <View style={[mapStyle.centerButton, {bottom: 0}]}>
        <TouchableOpacity
          style={mapStyle.circleBg}
          onPress={() => {
            showLocation({
              latitude: destCoordinate.latitude,
              longitude: destCoordinate.longitude,
              sourceLatitude: markers.lat,
              sourceLongitude: markers.lng,
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
