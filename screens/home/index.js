import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import styles from './styles';

import {useNavigate} from 'react-router';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
}
