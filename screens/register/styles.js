import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    minWidth: '70%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  topNavigation: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  topLeftNavigation: {
    width: '25%',
  },
  topRightNavigation: {
    width: '25%',
    alignItems: 'flex-end',
  },
  topMiddleNavigation: {
    width: '25%',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
