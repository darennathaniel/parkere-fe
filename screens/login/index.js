import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {handleLogin} from './services';
import {setToken} from '../common/authorization';
import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../slices/isLoggedSlice';
import typography from '../common/typography';

import {AxiosInit} from '../../axios';

import * as Google from 'expo-auth-session/providers/google';
import PopUp from '../common/errorModal';
import {getFavorite} from '../../slices/services';

export default function Login(props) {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      '563666231483-9pu6trg81cf97j7ovrfjhacoh8056psq.apps.googleusercontent.com',
    androidClientId:
      '563666231483-7uob03m1f8de2e2dd7pfrm90vrgcdehl.apps.googleusercontent.com',
  });

  const dispatch = useDispatch();

  const carparks = useSelector(state => state.carparks);

  useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response;
      const parkereAxios = AxiosInit();
      parkereAxios
        .get('/user/google', {
          headers: {Authorization: 'Bearer ' + authentication.accessToken},
        })
        .then(async res => {
          setToken(res.data.token);
          const favorites = await getFavorite();
          if (carparks.filtered) {
            const filterData = favorites.filter(e => carparks.data.includes(e));
            dispatch(
              setLogin({
                value: true,
                token: res.data.token,
                favorite: filterData,
              }),
            );
          } else {
            dispatch(
              setLogin({
                value: true,
                token: res.data.token,
                favorite: favorites,
              }),
            );
          }
          navigation.navigate('Home');
        })
        .catch(err => {
          setShow(true);
          setErrorMsg(err.response.data.message);
        });
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[typography.text, styles.titleText]}>Sign in</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={value => {
            setUsername(value);
          }}
          placeholder="Username"
          autoCapitalize="none"></TextInput>
        <TextInput
          style={styles.textInput}
          onChangeText={value => setPassword(value)}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}></TextInput>
        <View style={styles.registerLine}>
          <Text>Haven't </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={{color: 'navy'}}>Registered?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={async () => {
            try {
              const login = await handleLogin({
                username: username,
                password: password,
              });
              setToken(login.data.data.token);
              const favorites = await getFavorite();
              if (carparks.filtered) {
                const filterData = favorites.filter(e =>
                  carparks.data.some(f => f._id === e._id),
                );
                dispatch(
                  setLogin({
                    value: true,
                    token: login.data.data.token,
                    favorite: filterData,
                  }),
                );
              } else {
                dispatch(
                  setLogin({
                    value: true,
                    token: login.data.data.token,
                    favorite: favorites,
                  }),
                );
              }
              navigation.navigate('Home');
            } catch (err) {
              setShow(true);
              setErrorMsg(err.response.data.message);
            }
          }}>
          <Text style={[typography.text, styles.loginText]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleContainer}
          onPress={() => {
            promptAsync();
          }}>
          <View style={styles.googleImgContainer}>
            <Image
              source={require('./assets/google.png')}
              style={styles.googleImg}
            />
          </View>
          <View style={styles.googleTextContainer}>
            <Text style={[typography.text, styles.googleText]}>
              Sign in / up with Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <PopUp show={show} setShow={setShow} message={errorMsg} />
    </SafeAreaView>
  );
}
