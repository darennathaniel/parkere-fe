import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '700',
  },
  text: {
    fontSize: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
  },
  reset: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
  },
  apply: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '60%',
  },
});

export default styles;
