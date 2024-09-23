import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../application/redux/Store.redux';
import {signup} from '../../../application/redux/asyncThunk/Auth.asyncThunk';
import {SignupRequest} from '../../../domain/models/auth.models';
import {validateCredentialsSignup} from '../../utils/ValidateUserInput.utils';
import {setToken} from '../../utils/TokenManager.utils';

// svg image
import SignupImage from '../../assets/images/svj/signup_title_figma.svg';
// strings import
import {strings} from '../../assets/strings/strings';

// components import
import CustomTextInput from '../../components/CustomTextInput.componentes';

const Signup = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loaderVisiblity, setLoaderVisiblity] = useState(false);
  const [errorMsgVisibility, setErrorMsgVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');

  const {errorStrSignup, loader, token, isSignedIn} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoaderVisiblity(loader);
  }, [loader]);

  useEffect(() => {
    if (errorStrSignup) {
      setErrorMsgVisibility(true);
      setErrorMsg(errorStrSignup);
    }
  }, [errorStrSignup]);

  useEffect(() => {
    const setAuthToken = async () => {
      if (isSignedIn) {
        const response = await setToken(token);
        if (response) {
          navigation.navigate('App', {screen: 'Home'});
        }
      }
    };

    setAuthToken();
  }, [isSignedIn]);

  const handleSignup = () => {
    // validating inputs
    let signupreq: SignupRequest = {username, email, password};
    const validate = validateCredentialsSignup(signupreq);
    if (!validate.isValid) {
      setErrorMsgVisibility(true);
      setErrorMsg(validate.message);
      return;
    }
    // dispatching the signup action
    dispatch(signup(signupreq));
    setErrorMsgVisibility(true);
    setErrorMsg(errorStrSignup);
  };

  const handleTextClick = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{alignSelf: 'center'}}>
        <SignupImage
          style={[{alignSelf: 'center'}, styles.signupImgScaling]}
          width={scale(300)}
          height={verticalScale(70)}
        />

        <Text style={[{alignSelf: 'flex-end'}, styles.welcomeTextScaling]}>
          {strings.RegisterScreen.welcomeMsg1}
        </Text>
      </View>

      <Progress.Bar
        style={[{opacity: loaderVisiblity ? 1 : 0}, styles.loaderScaling]}
        borderWidth={0}
        indeterminate={true}
        width={null}
        color="black"
        borderRadius={0}
      />

      <View>
        <Text style={[{color: 'black'}, styles.lblScaling]}>
          {strings.RegisterScreen.usernameLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            {alignSelf: 'center'},
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.RegisterScreen.usernameHint}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={[{color: 'black'}, styles.lblScaling]}>
          {strings.RegisterScreen.emailLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            {alignSelf: 'center'},
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.RegisterScreen.emailHint}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[{color: 'black'}, styles.lblScaling]}>
          {strings.RegisterScreen.passwordLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            {alignSelf: 'center'},
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.RegisterScreen.passwordHint}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text
          style={[
            {color: 'red', fontFamily: 'Roboto-Regular'},
            {opacity: errorMsgVisibility ? 1 : 0},
            styles.errorLblScaling,
          ]}>
          {errorMsg}
        </Text>

        <Button
          style={[
            {
              width: '60%',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 40,
            },
            styles.elevationBtn,
            styles.btnScaling,
          ]}
          labelStyle={styles.btnFont}
          mode="contained"
          onPress={handleSignup}
          buttonColor="black"
          textColor="white">
          {strings.RegisterScreen.btnLable}
        </Button>

        <TouchableOpacity onPress={handleTextClick}>
          <Text style={[{alignSelf: 'center'}, styles.alredyHaveAccScaling]}>
            {strings.RegisterScreen.alredyHaveAcc1}
            <Text style={{color: '#2700E0'}}>
              {strings.RegisterScreen.alredyHaveAcc2}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  elevation: {
    // android
    elevation: 10,
    //ios
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  elevationBtn: {
    // android
    elevation: 15,
    //ios
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  signupImgScaling: {
    marginTop: verticalScale(60),
  },
  welcomeTextScaling: {
    fontSize: scale(22),
    marginBottom: verticalScale(30),
    opacity: 0.5,
    fontFamily: 'Roboto-Medium',
  },
  loaderScaling: {
    marginBottom: verticalScale(30),
  },
  lblScaling: {
    marginBottom: verticalScale(15),
    marginLeft: scale(50),
    fontSize: scale(18),
    fontFamily: 'Robot-Regular',
  },
  inputScaling: {
    width: '80%',
    marginBottom: verticalScale(20),
  },
  errorLblScaling: {
    marginLeft: scale(40),
    fontSize: scale(15),
    marginBottom: verticalScale(50),
  },
  btnScaling: {
    marginBottom: verticalScale(30),
    height: verticalScale(40),
  },
  alredyHaveAccScaling: {
    fontSize: scale(18),
    fontFamily: 'Roboto-Regular',
  },
  btnFont: {
    fontFamily: 'Roboto-Bold',
    fontSize: scale(15),
  },
});

export default Signup;
