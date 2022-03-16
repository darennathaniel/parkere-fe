import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
    width: '95%',
    height: '90%',
  },
  carparkContainer: {
    flex: 1,
    padding: 13,
    backgroundColor: '#F2F0F0',
    marginTop: 10,
    width: '100%',
  },
  searchContainer: {
    height: '13%',
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
  searchImage: {
    height: 30,
    width: 30,
  },
});

export default styles;
