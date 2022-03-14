import React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {delToken} from '../common/authorization';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setLogout} from '../../slices/isLoggedSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const data = useSelector(state => state.isLogged);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{data.name}</Text>
        {data.favorite.map(favorite => {
          return <Text key={favorite.favorite_id}>{favorite.carpark_id}</Text>;
        })}
        <Button
          title="Logout"
          onPress={() => {
            delToken();
            dispatch(setLogout({value: false}));
          }}
        />
      </View>
    </SafeAreaView>
  );
}
