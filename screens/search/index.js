import React, {useState} from 'react';
import {
  Linking,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {filterCarpark, handleChangeText} from './services';
import styles from './styles';
import typography from '../common/typography';

export default function Search(props) {
  const carparks = useSelector(state => state.carparks.data);
  const [filterNo, setFilterNo] = useState('');
  const [filterAddr, setFilterAddr] = useState('');
  const filteredCarparks = filterCarpark(carparks, filterNo, filterAddr);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require('./assets/search.png')}
          style={styles.searchImage}
        />
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search Park Number..."
            onChangeText={e => {
              handleChangeText(e, setFilterNo);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Search Park Address..."
            onChangeText={e => {
              handleChangeText(e, setFilterAddr);
            }}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {filteredCarparks.map(carpark => {
          return (
            <TouchableOpacity
              key={carpark._id}
              onPress={() =>
                props.navigation.navigate(carpark.park_number, {search: true})
              }>
              <View style={styles.carparkContainer}>
                <Text style={typography.text}>
                  {carpark.park_address} ({carpark.park_number})
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );

  // const latitude = '30.3753';
  // const longitude = '69.3451';
  // const openMapDirection = () => {
  //   const url = Platform.select({
  //     ios: `comgooglemaps://?center=${latitude},${longitude}&q=${latitude},${longitude}&zoom=14&views=traffic"`,
  //     android: `geo://?q=${latitude},${longitude}`,
  //   });
  //   Linking.canOpenURL(url)
  //     .then(supported => {
  //       if (supported) {
  //         return Linking.openURL(url);
  //       } else {
  //         const browser_url = `https://www.google.de/maps/@${latitude},${longitude}`;
  //         return Linking.openURL(browser_url);
  //       }
  //     })
  //     .catch(() => {
  //       if (Platform.OS === 'ios') {
  //         Linking.openURL(`maps://?q=${latitude},${longitude}`);
  //       }
  //     });
  // };
}
