import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    minHeight: '200%',
  },
  carparkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  reviewTextContainer: {
    width: '100%',
    height: '40%',
  },
  reviewText: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
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
});

export default styles;
