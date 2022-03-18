import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import styles from './styles';
import loginStyles from '../login/styles';
import typography from '../common/typography';

import {handleRegister} from './services';
import {setToken} from '../common/authorization';

import {useDispatch, useSelector} from 'react-redux';
import {setLogin} from '../../slices/isLoggedSlice';
import PopUp from '../common/errorModal';

import {getFavorite} from '../../slices/services';

export default function Register(props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const carparks = useSelector(state => state.carparks);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topLeftNavigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={[typography.text, loginStyles.titleText]}>Sign up</Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={value => {
              setEmail(value);
            }}
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={value => {
              setUsername(value);
            }}
            placeholder="Username"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={value => {
              setPassword(value);
            }}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={loginStyles.loginButton}
            onPress={async () => {
              try {
                const register = await handleRegister({
                  username: username,
                  email: email,
                  password: password,
                });
                setToken(register.data.data.token);
                const favorites = await getFavorite();
                if (carparks.filtered) {
                  const filterData = favorites.filter(e =>
                    carparks.data.includes(e),
                  );
                  dispatch(
                    setLogin({
                      value: true,
                      token: register.data.data.token,
                      favorite: filterData,
                    }),
                  );
                } else {
                  dispatch(
                    setLogin({
                      value: true,
                      token: register.data.data.token,
                      favorite: favorites,
                    }),
                  );
                }
                navigation.navigate('Home');
              } catch (err) {
                setErrorMsg(err.response.data.message);
                setShow(true);
              }
            }}>
            <Text style={[typography.text, loginStyles.loginText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <PopUp show={show} setShow={setShow} message={errorMsg} />
    </SafeAreaView>
  );
}
