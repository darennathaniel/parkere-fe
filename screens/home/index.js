import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './styles';
import MapView from 'react-native-maps';

import {useNavigate} from 'react-router';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MapView style={styles.map} />
      </View>
    </SafeAreaView>
  );
}
