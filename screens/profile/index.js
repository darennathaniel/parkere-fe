import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {delToken} from '../common/authorization';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '../../slices/isLoggedSlice';

export default function Profile() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Profile</Text>
        <Button
          title="Logout"
          onPress={() => {
            delToken();
            dispatch(setIsLogged({value: false, name: ''}));
          }}
        />
      </View>
    </SafeAreaView>
  );
}
