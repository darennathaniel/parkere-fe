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

export default function Register(props) {
  const navigation = useNavigation();

  // const {setSigned} = props;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
              const register = await handleRegister({
                username: username,
                email: email,
                password: password,
              });
              // setSigned(register.data.data.token);
              setToken(register.data.data.token);
              navigation.navigate('Home');
            }}></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
