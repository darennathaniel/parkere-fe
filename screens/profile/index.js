import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {delToken} from '../common/authorization';
import styles from './styles';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Profile</Text>
        <Button title="Logout" onPress={delToken} />
      </View>
    </SafeAreaView>
  );
}
