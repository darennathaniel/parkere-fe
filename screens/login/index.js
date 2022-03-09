import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/core';
import {handleLogin} from './services';
import {setToken} from '../common/authorization';
import {useDispatch} from 'react-redux';
import {setIsLogged} from '../../slices/isLoggedSlice';

import {AxiosInit} from '../../axios';

import * as Google from 'expo-auth-session/providers/google';
import PopUp from '../common/modal';

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

  useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response;
      const parkereAxios = AxiosInit();
      parkereAxios
        .get('/user/google', {
          headers: {Authorization: 'Bearer ' + authentication.accessToken},
        })
        .then(res => {
          setToken(res.data.token);
          dispatch(setIsLogged({value: true, name: res.data.name}));
          navigation.navigate('Home');
        })
        .catch(err => console.log(err));
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Sign in</Text>
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
        <Button
          title="Login"
          underlayColor="#fff"
          onPress={async () => {
            try {
              const login = await handleLogin({
                username: username,
                password: password,
              });
              setToken(login.data.data.token);
              dispatch(setIsLogged({value: true, name: username}));
              navigation.navigate('Home');
            } catch (err) {
              setShow(true);
              setErrorMsg(err.response.data.message);
            }
          }}></Button>
        <Button
          title="Google Login"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
      <View style={styles.registerLine}>
        <Text>Haven't </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{color: 'navy'}}>Registered?</Text>
        </TouchableOpacity>
      </View>
      <PopUp show={show} setShow={setShow} message={errorMsg} />
    </SafeAreaView>
  );
}