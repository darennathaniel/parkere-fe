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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftNavigation: {
    paddingLeft: 20,
  },
  topRightNavigation: {
    paddingRight: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
