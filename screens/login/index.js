import React, {useState} from 'react';
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

export default function Login(props) {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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
              dispatch(setIsLogged({value: true}));
              navigation.navigate('Home');
            } catch (err) {
              console.log(err);
            }
          }}></Button>
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
    </SafeAreaView>
  );
}
