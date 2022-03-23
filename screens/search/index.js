import React, {useRef, useState} from 'react';
import {
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
import bottomButton from '../home/styles';
import typography from '../common/typography';

export default function Search(props) {
  const carparks = useSelector(state => state.carparks.data);
  const [filterNo, setFilterNo] = useState('');
  const [filterAddr, setFilterAddr] = useState('');
  const filteredCarparks = filterCarpark(carparks, filterNo, filterAddr);
  const ref = useRef(null);

  const handleTop = () => {
    ref.current.scrollTo({x: 0, y: 0, animated: true});
  };

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
      <ScrollView style={styles.scrollContainer} ref={ref}>
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
      <View style={bottomButton.centerButton}>
        <TouchableOpacity
          style={[bottomButton.circleBg, {bottom: -60}]}
          onPress={() => {
            handleTop();
          }}>
          <Image
            source={require('./assets/upload.png')}
            style={bottomButton.locationImage}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
