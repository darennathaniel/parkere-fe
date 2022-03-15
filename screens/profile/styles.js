import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  emailContainer: {
    flex: 1,
    padding: 20,
  },
  favoriteContainer: {
    flex: 10,
    padding: 20,
  },
  logoutContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
});

export default styles;
