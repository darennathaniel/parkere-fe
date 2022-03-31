import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {delToken} from '../common/authorization';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {setLogout} from '../../slices/isLoggedSlice';
import search from '../search/styles';
import typography from '../common/typography';

export default function Profile(props) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.isLogged);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={[typography.text, {fontSize: 17, fontWeight: '800'}]}>
          USERNAME - {data.name}
        </Text>
      </View>
      <View style={styles.emailContainer}>
        <Text style={[typography.text, {fontSize: 17, fontWeight: '800'}]}>
          EMAIL - {data.email}
        </Text>
      </View>
      <View style={styles.favoriteContainer}>
        <Text style={[typography.text, {fontSize: 17, fontWeight: '800'}]}>
          Favorites
        </Text>
        <ScrollView>
          {data.favorite.length > 0 ? (
            data.favorite.map(favorite => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(favorite.park_number);
                  }}
                  key={favorite.park_number}
                  style={[search.carparkContainer, {justifyContent: 'center'}]}>
                  <Text style={typography.text}>
                    {favorite.park_address} ({favorite.park_number})
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text>You have no favorites yet!</Text>
          )}
        </ScrollView>
      </View>
      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          onPress={() => {
            delToken();
            dispatch(
              setLogout({
                value: false,
                location: {...data.location},
                search: {...data.search},
              }),
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
