import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
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
  const [offset, setOffest] = useState(0);

  const [filterNo, setFilterNo] = useState('');
  const [filterAddr, setFilterAddr] = useState('');
  const [filterFree, setFilterFree] = useState(null);
  const [filterNight, setFilterNight] = useState(null);
  const [filterBasement, setFilterBasement] = useState(null);
  const [filterShort, setFilterShort] = useState(null);
  const [filterDistance, setFilterDistance] = useState(null);

  const [filteredCarparks, setFilteredCarparks] = useState(
    filterCarpark(
      carparks,
      filterNo,
      filterAddr,
      filterFree,
      filterNight,
      filterBasement,
      filterShort,
      filterDistance,
    ),
  );
  const ref = useRef(null);

  const handleTop = () => {
    ref.current.scrollToIndex({index: 0, animated: true});
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        testID="park_number"
        key={item.park_number}
        onPress={() =>
          props.navigation.navigate(item.park_number, {search: true})
        }>
        <View key={item.night_parking} style={styles.carparkContainer}>
          <View>
            <Text style={typography.text}>
              {item.park_address} ({item.park_number})
            </Text>
          </View>
          <View>
            {parseInt(item.distance) === 0 ? (
              <Text style={typography.text}>
                {parseInt(item.distance * 1000)}m
              </Text>
            ) : (
              <Text style={typography.text}>{parseInt(item.distance)}km</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
            <TouchableOpacity
              onPress={() => setShow(true)}
              testID="open_button">
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
      <FlatList
        style={styles.scrollContainer}
        ref={ref}
        testID="scroll_view"
        data={filteredCarparks}
        renderItem={renderItem}
        keyExtractor={item => item.park_number}
        onScroll={e => setOffest(e.nativeEvent.contentOffset.y)}
      />
      {offset > 500 ? (
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
      ) : (
        <View></View>
      )}
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
        filterDistance={filterDistance}
        setFilterDistance={setFilterDistance}
      />
    </SafeAreaView>
  );
}
