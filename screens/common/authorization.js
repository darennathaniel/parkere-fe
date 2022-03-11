import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const delToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (err) {
    console.log(err);
  }
};
