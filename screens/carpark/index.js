import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import topNav from '../register/styles';

export default function Carpark(props) {
  const navigation = useNavigation();
  const {route} = props;
  const carpark = route.params.carpark;
  return (
    <SafeAreaView style={styles.container}>
      <View style={topNav.topNavigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carparkContainer}>
        <Text>{carpark.park_number}</Text>
        <Text>{carpark.park_address}</Text>
      </View>
    </SafeAreaView>
  );
}
