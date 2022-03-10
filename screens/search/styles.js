import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  carparkContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  searchContainer: {
    height: '13%',
    backgroundColor: '#eeeeee',
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'space-evenly',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    height: '40%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  scrollContainer: {
    height: '90%',
  },
  searchImage: {
    height: 30,
    width: 30,
  },
});

export default styles;
