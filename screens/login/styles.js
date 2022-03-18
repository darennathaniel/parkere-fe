import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    margin: 10,
  },
  textInput: {
    height: 40,
    minWidth: '70%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
  registerLine: {
    flexDirection: 'row',
    padding: 3,
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 40,
  },
  loginButton: {
    margin: 10,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  loginText: {
    fontSize: 20,
  },
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '60%',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 10,
  },
  googleImgContainer: {
    width: '20%',
  },
  googleImg: {
    width: 30,
    height: 30,
  },
  googleTextContainer: {
    width: '80%',
  },
  googleText: {
    fontSize: 15,
  },
});

export default styles;
