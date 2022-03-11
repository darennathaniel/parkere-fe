import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from './styles';
import topNav from '../register/styles';
import {getReviews, handleShow} from './services';
import ReviewModal from './modal/reviewModal';
import PopUp from '../common/modal';

export default function Carpark(props) {
  const navigation = useNavigation();
  const {route} = props;
  const carpark = route.params.carpark;

  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);

  useEffect(() => {
    getReviews(carpark._id)
      .then(res => {
        setReviews(res.data.data);
      })
      .catch(err => console.log(err.response.data));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={topNav.topNavigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.carparkContainer}>
          <Text>{carpark.park_number}</Text>
          <Text>{carpark.park_address}</Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text>Review</Text>
          <TouchableOpacity onPress={() => handleShow(setShow, setShowErr)}>
            <Image
              source={require('./assets/plus.png')}
              style={styles.plusImage}
            />
          </TouchableOpacity>
          {reviews.map(review => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Text>{review.username} </Text>
                <Text>{review.rating} </Text>
                <Text>{review.comment}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <ReviewModal
        show={show}
        setShow={setShow}
        title={carpark.park_number}
        carparkId={carpark._id}
        reviews={reviews}
        setReviews={setReviews}
      />
      <PopUp
        show={showErr}
        setShow={setShowErr}
        message={'Please Login to give a review!'}
      />
    </SafeAreaView>
  );
}
