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
import buttonRight from '../home/styles';
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
import typography from '../common/typography';
import googleStyle from '../login/styles';

export default function Carpark(props) {
  const {route} = props;
  const dispatch = useDispatch();
  const carpark = route.params.carpark;
  const user = useSelector(state => state.isLogged);
  const carparks = useSelector(state => state.carparks);
  const [ratings, setRatings] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    getReviews(carpark._id)
      .then(res => {
        setReviews(res.data.data);
        if (res.data.data.length > 0) {
          let totalRatings = 0;
          for (let i = 0; i < res.data.data.length; i++) {
            totalRatings += res.data.data[i].rating;
          }
          setRatings(totalRatings);
          setTotal(res.data.data.length);
        }
      })
      .catch(err => {
        setErrMsg(err.response.data.message);
        setShowErr(true);
      });

    getAvailability()
      .then(res => {
        const data = res.data.items[0].carpark_data.filter(
          e => e.carpark_number === carpark.park_number,
        )[0].carpark_info[0];
        if (data) {
          setAvailable(data.lots_available);
          setCapacity(data.total_lots);
        }
      })
      .catch(err => {});
  }, []);

  const [reviews, setReviews] = useState([]);
  const [available, setAvailable] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          topNav.topNavigation,
          {backgroundColor: 'white', alignItems: 'center'},
        ]}>
        <View style={topNav.topLeftNavigation}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={topNav.topMiddleNavigation}>
          {user.location.lat === 0 && user.location.lng === 0 ? (
            <TouchableOpacity
              style={[buttonRight.circleBg, {width: 40, height: 40}]}
              onPress={() => {
                openMapDirection(
                  carpark.lat,
                  carpark.lon,
                  carpark.park_address,
                );
              }}>
              <Image
                source={require('../login/assets/google.png')}
                style={googleStyle.googleImg}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                buttonRight.circleBg,
                {width: '110%', height: 40, flexDirection: 'row'},
              ]}
              onPress={() => {
                props.navigation.navigate('Map', {
                  latitude: carpark.lat,
                  longitude: carpark.lon,
                });
              }}>
              <Image
                source={require('../login/assets/google.png')}
                style={googleStyle.googleImg}
              />
              <Text style={[typography.text, {fontSize: 15}]}>
                {'  '}Directions
              </Text>
            </TouchableOpacity>
          )}
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
                <Text>Delete Favorite</Text>
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
          <View style={topNav.topRightNavigation}></View>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.carparkContainer}>
          <View style={styles.carparkTitleContainer}>
            <Text style={[typography.text, styles.carparkNumberText]}>
              {carpark.park_number}
              <Text style={{fontSize: 15}}>({carpark.building_type})</Text>
            </Text>
          </View>
          <View style={styles.carparkContentContainer}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Available Slots:{' '}
              {available === 0 && capacity === 0 ? (
                <Text>No information</Text>
              ) : (
                <Text>
                  {available}/{capacity}
                </Text>
              )}
            </Text>
          </View>
          <View style={styles.carparkContentContainer}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Address
            </Text>
            <Text
              style={[
                typography.text,
                styles.carparkContentText,
                {fontSize: 13},
              ]}>
              {carpark.park_address}
            </Text>
          </View>
          <View style={styles.carparkContentContainer}>
            {carpark.rate.length > 20 ? (
              <>
                <Text style={[typography.text, styles.carparkContentText]}>
                  Rate
                </Text>
                <Text
                  style={[
                    typography.text,
                    styles.carparkContentText,
                    {fontSize: 13},
                  ]}>
                  {carpark.rate}
                </Text>
              </>
            ) : (
              <Text style={[typography.text, styles.carparkContentText]}>
                Rate: {carpark.rate}
              </Text>
            )}
          </View>
          <View
            style={[styles.carparkContentContainer, {flexDirection: 'row'}]}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Paying System:
            </Text>
            {carpark.paying_system === 'COUPON PARKING' ? (
              <>
                <Text style={[typography.text, styles.carparkContentText]}>
                  {' '}
                  Electronic
                </Text>
                <Image
                  style={styles.parkImage}
                  source={require('./assets/coupon.png')}
                />
              </>
            ) : (
              <>
                <Text style={[typography.text, styles.carparkContentText]}>
                  {' '}
                  Coupon
                </Text>
                <Image
                  style={styles.parkImage}
                  source={require('./assets/ticket-machine.png')}
                />
              </>
            )}
          </View>
          <View
            style={[styles.carparkContentContainer, {flexDirection: 'row'}]}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Short Term Parking
            </Text>
            {carpark.short_term === 'NO' ? (
              <Image
                style={styles.noImage}
                source={require('./assets/no.png')}
              />
            ) : (
              <Text>: {carpark.short_term}</Text>
            )}
          </View>
          <View
            style={[styles.carparkContentContainer, {flexDirection: 'row'}]}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Night Parking
            </Text>
            {carpark.night_parking === 'YES' ? (
              <Image
                style={styles.yesImage}
                source={require('./assets/yes.png')}
              />
            ) : (
              <Image
                style={styles.noImage}
                source={require('./assets/no.png')}
              />
            )}
          </View>
          <View
            style={[styles.carparkContentContainer, {flexDirection: 'row'}]}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Free Parking
            </Text>
            {carpark.free_parking === 'NO' ? (
              <Image
                style={styles.noImage}
                source={require('./assets/no.png')}
              />
            ) : (
              <Text
                style={[
                  typography.text,
                  styles.carparkContentText,
                  {fontSize: 15},
                ]}>
                : {carpark.free_parking}
              </Text>
            )}
          </View>
          <View style={styles.carparkContentContainer}>
            <Text style={[typography.text, styles.carparkContentText]}>
              Gantry Height: {carpark.gantry_height}m
            </Text>
          </View>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.reviewTitleContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[typography.text, styles.reviewTitleText]}>
                Reviews{'  '}
                {ratings === 0 ? <Text></Text> : (ratings / total).toFixed(1)}
              </Text>
              {ratings === 0 ? (
                <></>
              ) : (
                <Image
                  style={{maxHeight: 25, maxWidth: 25, marginLeft: 5}}
                  source={require('./assets/star.png')}
                />
              )}
            </View>
            <View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleShow(setShow, setShowErr, setErrMsg)}>
                <Text>Add Review</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.reviewScrollView}>
            <ScrollView style={styles.reviewContentScrollContainer}>
              {reviews.length === 0 ? (
                <Text style={[typography.text, {fontSize: 20}]}>
                  No reviews yet!
                </Text>
              ) : (
                reviews.map(review => {
                  return (
                    <View
                      style={styles.reviewTextContainer}
                      key={review.review_id}>
                      <View style={styles.reviewTextUser}>
                        <View>
                          <Text style={[typography.text, styles.reviewUser]}>
                            {review.username}
                          </Text>
                        </View>
                        <View style={styles.reviewRating}>
                          <Text style={{fontSize: 20}}>{review.rating}</Text>
                          <Image
                            style={styles.starImage}
                            source={require('./assets/star.png')}
                          />
                        </View>
                      </View>
                      <View style={styles.reviewTextComment}>
                        <Text style={[typography.text, styles.reviewComment]}>
                          {review.comment.length === 0
                            ? '(No Comment)'
                            : review.comment}
                        </Text>
                      </View>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <ReviewModal
        show={show}
        setShow={setShow}
        title={carpark.park_number}
        carparkId={carpark._id}
        reviews={reviews}
        setReviews={setReviews}
        ratings={ratings}
        setRatings={setRatings}
        total={total}
        setTotal={setTotal}
      />
      <PopUp show={showErr} setShow={setShowErr} message={errMsg} />
    </SafeAreaView>
  );
}
