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
import FilterModal from './filterModal';

export default function Search(props) {
  const carparks = useSelector(state => state.carparks.data);

  const [show, setShow] = useState(false);
  const [filterNo, setFilterNo] = useState('');
  const [filterAddr, setFilterAddr] = useState('');
  const [filterFree, setFilterFree] = useState(null);
  const [filterNight, setFilterNight] = useState(null);
  const [filterBasement, setFilterBasement] = useState(null);
  const [filterShort, setFilterShort] = useState(null);

  const [filteredCarparks, setFilteredCarparks] = useState(
    filterCarpark(
      carparks,
      filterNo,
      filterAddr,
      filterFree,
      filterNight,
      filterBasement,
      filterShort,
    ),
  );
  const ref = useRef(null);

  const handleTop = () => {
    ref.current.scrollTo({x: 0, y: 0, animated: true});
  };

  console.log(filteredCarparks.length, filterFree);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View>
          <View style={{height: '20%'}}>
            <Image
              source={require('./assets/search.png')}
              style={styles.searchImage}
            />
          </View>
          <View
            style={{
              height: '50%',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => setShow(true)}>
              <Text>More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search Park Number..."
            testID="search_park_number"
            onChangeText={e => {
              handleChangeText(e, setFilterNo);
              setFilteredCarparks(
                filterCarpark(
                  carparks,
                  e,
                  filterAddr,
                  filterFree,
                  filterNight,
                  filterBasement,
                  filterShort,
                ),
              );
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Search Park Address..."
            onChangeText={e => {
              handleChangeText(e, setFilterAddr);
              setFilteredCarparks(
                filterCarpark(
                  carparks,
                  filterNo,
                  e,
                  filterFree,
                  filterNight,
                  filterBasement,
                  filterShort,
                ),
              );
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
                <Text style={typography.text} testID="carpark_text">
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
      <FilterModal
        show={show}
        setShow={setShow}
        setFilterShort={setFilterShort}
        setFilterBasement={setFilterBasement}
        setFilterFree={setFilterFree}
        setFilterNight={setFilterNight}
        filterShort={filterShort}
        filterBasement={filterBasement}
        filterFree={filterFree}
        filterNight={filterNight}
        setFilteredCarparks={setFilteredCarparks}
        filterNo={filterNo}
        filterAddr={filterAddr}
      />
    </SafeAreaView>
  );
}
