import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    height: '190%',
    backgroundColor: 'white',
  },
  carparkContainer: {
    height: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  carparkTitleContainer: {
    height: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carparkContentContainer: {
    height: '10%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  carparkContentText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  carparkNumberText: {
    fontSize: 35,
    fontWeight: '700',
  },
  plusImage: {
    width: 30,
    height: 30,
  },
  xImage: {
    width: 20,
    height: 20,
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 110,
    justifyContent: 'space-evenly',
    width: '80%',
  },
  xButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    top: 0,
  },
  reviewContainer: {
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  reviewTitleContainer: {
    height: '20%',
    width: '100%',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitleText: {
    fontSize: 37,
    fontWeight: '700',
  },
  reviewScrollView: {
    height: '80%',
    width: '80%',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reviewContentScrollContainer: {
    width: '100%',
  },
  reviewTextContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#F2F0F0',
    padding: 15,
    marginBottom: 1.5,
  },
  reviewTextUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 20,
  },
  reviewTextComment: {
    minHeight: 100,
  },
  reviewUser: {
    fontSize: 15,
    fontWeight: '700',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewComment: {
    fontSize: 13,
  },
  addButton: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
  },
  starImage: {
    maxWidth: 15,
    maxHeight: 15,
  },
  reviewTextContainerModal: {
    width: '100%',
    height: '40%',
  },
  reviewTextModal: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
  },
  reviewTitleModal: {
    fontSize: 20,
    fontWeight: '700',
  },
  yesImage: {
    marginLeft: 5,
    maxWidth: 30,
    maxHeight: 30,
  },
  noImage: {
    marginLeft: 5,
    maxWidth: 25,
    maxHeight: 25,
  },
  parkImage: {
    marginLeft: 5,
    maxHeight: 30,
    maxWidth: 30,
  },
});

export default styles;
