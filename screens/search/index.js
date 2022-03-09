import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  Linking,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import styles from './styles';

export default function Search(props) {
  const carparks = useSelector(state => state.carparks.data);
  // const latitude = '30.3753';
  // const longitude = '69.3451';
  // const openMapDirection = () => {
  //   const url = Platform.select({
  //     ios: `comgooglemaps://?center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=14&views=traffic"`,
  //     android: `geo://?q=${latitude},${longitude}`,
  //   });
  //   Linking.canOpenURL(url)
  //     .then(supported => {
  //       if (supported) {
  //         return Linking.openURL(url);
  //       } else {
  //         const browser_url = `https://www.google.de/maps/@${latitude},${longitude}`;
  //         return Linking.openURL(browser_url);
  //       }
  //     })
  //     .catch(() => {
  //       if (Platform.OS === 'ios') {
  //         Linking.openURL(`maps://?q=${latitude},${longitude}`);
  //       }
  //     });
  // };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* <Text onPress={() => openMapDirection()}>Search</Text> */}
        {carparks.map(carpark => {
          return (
            <Pressable
              key={carpark._id}
              onPress={() => navigation.navigate(carpark.park_number)}>
              <View style={styles.carparkContainer}>
                <Text>{carpark.park_number}</Text>
                <Text>{carpark.park_address}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
