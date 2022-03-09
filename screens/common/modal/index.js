import React from 'react';

import {Modal, View, Text, Pressable} from 'react-native';

import styles from './styles';

export default function PopUp(props) {
  const {show, setShow, message} = props;
  return (
    <Modal animationType="slide" visible={show} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <Text style={styles.text}>{message}</Text>
          <Pressable style={styles.button} onPress={() => setShow(false)}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
