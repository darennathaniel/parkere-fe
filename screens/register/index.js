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

import {handleRegister} from './services';
import {setToken} from '../common/authorization';

import {useDispatch} from 'react-redux';
import {setLogin} from '../../slices/isLoggedSlice';
import PopUp from '../common/errorModal';

export default function Register(props) {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View>
          <Text>Sign up</Text>
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
          <Button
            title="Register"
            underlayColor="#fff"
            onPress={async () => {
              try {
                const register = await handleRegister({
                  username: username,
                  email: email,
                  password: password,
                });
                setToken(register.data.data.token);
                dispatch(
                  setLogin({value: true, token: register.data.data.token}),
                );
                navigation.navigate('Home');
              } catch (err) {
                setErrorMsg(err.response.data.message);
                setShow(true);
              }
            }}></Button>
        </View>
      </View>
      <PopUp show={show} setShow={setShow} message={errorMsg} />
    </SafeAreaView>
  );
}
