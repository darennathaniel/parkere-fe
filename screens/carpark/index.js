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
import {
  getAvailability,
  getReviews,
  handleShow,
  openMapDirection,
} from './services';
import ReviewModal from './reviewModal';
import PopUp from '../common/errorModal';
import {useSelector, useDispatch} from 'react-redux';
import {setFavorite} from '../../slices/isLoggedSlice';
import {addFavorite, delFavorite, getFavorite} from '../../slices/services';

export default function Carpark(props) {
  const {route} = props;
  const dispatch = useDispatch();
  const carpark = route.params.carpark;
  const user = useSelector(state => state.isLogged);
  const carparks = useSelector(state => state.carparks);
  useEffect(() => {
    getReviews(carpark._id)
      .then(res => {
        setReviews(res.data.data);
      })
      .catch(err => console.log(err.response.data));

    getAvailability()
      .then(res => {
        const data = res.data.items[0].carpark_data.filter(
          e => e.carpark_number === carpark.park_number,
        )[0].carpark_info[0];
        setAvailable(data.lots_available);
        setCapacity(data.total_lots);
      })
      .catch(err => console.log(err));
    return () => {};
  }, []);

  const [reviews, setReviews] = useState([]);
  const [available, setAvailable] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={topNav.topNavigation}>
        <View style={topNav.topLeftNavigation}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        {user.value ? (
          user.favorite.filter(e => e._id === carpark._id).length > 0 ? (
            <View style={topNav.topRightNavigation}>
              <TouchableOpacity
                onPress={async () => {
                  const favorite = await getFavorite();
                  const delFav = await delFavorite(carpark._id);
                  const filteredFavorite = favorite.filter(
                    e => e._id !== carpark._id,
                  );
                  if (carparks.filtered) {
                    const filterData = filteredFavorite.filter(e =>
                      carparks.data.some(f => f._id === e._id),
                    );
                    dispatch(
                      setFavorite({
                        favorite: filterData,
                      }),
                    );
                  } else {
                    dispatch(
                      setFavorite({
                        favorite: filteredFavorite,
                      }),
                    );
                  }
                }}>
                <Text>Delete From Favorite</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={topNav.topRightNavigation}>
              <TouchableOpacity
                onPress={async () => {
                  const favorite = await getFavorite();
                  const addFav = await addFavorite(carpark._id);
                  favorite.push(addFav);
                  if (carparks.filtered) {
                    const filterData = favorite.filter(e =>
                      carparks.data.some(f => f._id === e._id),
                    );
                    dispatch(
                      setFavorite({
                        favorite: filterData,
                      }),
                    );
                  } else {
                    dispatch(
                      setFavorite({
                        favorite: favorite,
                      }),
                    );
                  }
                }}>
                <Text>Add to Favorite</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <></>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.carparkContainer}>
          <View>
            <Text>{carpark.park_number}</Text>
          </View>
          <View>
            <Text>
              {available}/{capacity}
            </Text>
          </View>
          <View>
            <Text>{carpark.park_address}</Text>
          </View>
          <View>
            <Text>{carpark.rate}</Text>
          </View>
          <View>
            <Text>Night Parking: {carpark.night_parking}</Text>
          </View>
          <View>
            <Text>Gantry Height: {carpark.gantry_height}m</Text>
          </View>
          <View>
            {carpark.building_type === 'SURFACE CAR PARK' ? (
              <Text>Not Sheltered</Text>
            ) : (
              <Text>Sheltered</Text>
            )}
          </View>
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
              <View style={{flexDirection: 'row'}} key={review.review_id}>
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

{
  /* <TouchableOpacity
            onPress={() => {
              openMapDirection(carpark.lat, carpark.lon);
            }}>
            <Text>Button</Text>
          </TouchableOpacity> */
}
