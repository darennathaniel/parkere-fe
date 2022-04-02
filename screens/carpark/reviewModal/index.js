import React, {useState} from 'react';

import {Rating} from 'react-native-ratings';

import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';

import styles from '../styles';
import button from '../../common/errorModal/styles';
import {handleSubmit} from './services';

import PopUp from '../../common/errorModal';

import typography from '../../common/typography';

export default function ReviewModal(props) {
  const {
    show,
    setShow,
    title,
    carparkId,
    reviews,
    setReviews,
    ratings,
    setRatings,
    total,
    setTotal,
  } = props;

  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');

  const [showErr, setShowErr] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={styles.centerModal}>
        <View style={styles.modalBox}>
          <View style={styles.xButtonContainer}>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Image
                source={require('../assets/close.png')}
                style={styles.xImage}
              />
            </TouchableOpacity>
          </View>
          <View>
            <View />
            <Text style={[typography.text, styles.reviewTitleModal]}>
              {title} Review
            </Text>
          </View>
          <View>
            <Rating
              showRating
              onFinishRating={rating => setRating(rating)}
              jumpValue={1}
            />
          </View>
          <View style={styles.reviewTextContainerModal}>
            <TextInput
              style={styles.reviewTextModal}
              multiline
              onChangeText={e => {
                setComment(e);
              }}
            />
          </View>
          <Pressable
            onPress={async () => {
              try {
                const response = await handleSubmit({
                  rating: rating,
                  carparkId: carparkId,
                  comment: comment,
                });
                setReviews([...reviews, response]);
                setRatings(ratings + rating);
                setTotal(total + 1);
                setShow(false);
              } catch (err) {
                setMessage(err.response.data.message);
                setShowErr(true);
              }
            }}
            style={button.button}>
            <Text style={button.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
      <PopUp show={showErr} setShow={setShowErr} message={message} />
    </Modal>
  );
}
