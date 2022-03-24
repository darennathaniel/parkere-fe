import React from 'react';

import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';

import modalStyles from '../../carpark/styles';
import styles from './styles';

import CheckBox from '@react-native-community/checkbox';

import typography from '../../common/typography';
import {filterCarpark} from '../services';
import {useSelector} from 'react-redux';

export default function FilterModal(props) {
  const {
    show,
    setShow,
    setFilterShort,
    setFilterBasement,
    setFilterFree,
    setFilterNight,
    filterShort,
    filterBasement,
    filterFree,
    filterNight,
    setFilteredCarparks,
    filterNo,
    filterAddr,
  } = props;
  const carparks = useSelector(state => state.carparks.data);
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={modalStyles.centerModal}>
        <View style={[modalStyles.modalBox, {height: 400}]}>
          <View style={modalStyles.xButtonContainer}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Image
                source={require('../../carpark/assets/close.png')}
                style={modalStyles.xImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[typography.text, styles.title]}>Filter</Text>
          </View>
          <View style={styles.container}>
            <Text style={[typography.text, styles.text]}>Free Parking</Text>
            <CheckBox
              value={filterFree === null ? false : filterFree}
              onValueChange={e => setFilterFree(e)}
            />
          </View>
          <View style={styles.container}>
            <Text style={[typography.text, styles.text]}>Night Parking</Text>
            <CheckBox
              value={filterNight === null ? false : filterNight}
              onValueChange={e => setFilterNight(e)}
            />
          </View>
          <View style={styles.container}>
            <Text style={[typography.text, styles.text]}>Basement</Text>
            <CheckBox
              value={filterBasement === null ? false : filterBasement}
              onValueChange={e => setFilterBasement(e)}
            />
          </View>
          <View style={styles.container}>
            <Text style={[typography.text, styles.text]}>Short Term</Text>
            <CheckBox
              value={filterShort === null ? false : filterShort}
              onValueChange={e => setFilterShort(e)}
            />
          </View>
          <View style={styles.buttons}>
            <View>
              <TouchableOpacity
                style={styles.reset}
                onPress={() => {
                  setFilterFree(null);
                  setFilterBasement(null);
                  setFilterNight(null);
                  setFilterShort(null);
                }}>
                <Text>Reset</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.apply}
                onPress={() => {
                  setShow(false);
                  setFilteredCarparks(
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
                }}>
                <Text>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
