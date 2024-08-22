import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {s} from 'react-native-wind';
import {Button} from 'react-native-paper';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../application/redux/Store.redux';
import {signup} from '../../application/redux/asyncThunk/Auth.asyncThunk';
import {SignupRequest} from '../../domain/models/auth.models';
import {validateCredentialsSignup} from '../utils/ValidateUserInput.utils';
import {setToken} from '../utils/TokenManager';

// svg image
import SignupImage from '../assets/images/svj/signup_title_figma.svg';

// strings import
import {strings} from '../assets/strings/strings';

// components import
import CustomTextInput from '../components/CustomTextInput.componentes';

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
    setLoaderVisiblity(loader);
    setErrorMsgVisibility(true);
    setErrorMsg(errorStrSignup);
  };

  const handleTextClick = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView style={s`flex`} showsVerticalScrollIndicator={false}>
      <SignupImage
        style={[s`self-center`, styles.signupImgScaling]}
        width={scale(300)}
        height={verticalScale(70)}
      />

      <Text style={[s`self-end`, styles.welcomeTextScaling]}>
        {strings.RegisterScreen.welcomeMsg1}
      </Text>

      <Progress.Bar
        style={[{opacity: loaderVisiblity ? 1 : 0}, styles.loaderScaling]}
        borderWidth={0}
        indeterminate={true}
        width={null}
        color="black"
        borderRadius={0}
      />

      <View>
        <Text style={[s`text-black`, styles.lblScaling]}>
          {strings.RegisterScreen.usernameLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            s`self-center`,
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.RegisterScreen.usernameHint}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={[s`text-black`, styles.lblScaling]}>
          {strings.RegisterScreen.emailLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            s`self-center`,
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.RegisterScreen.emailHint}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[s`text-black`, styles.lblScaling]}>
          {strings.RegisterScreen.passwordLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            s`self-center`,
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
            s`text-red-600`,
            {opacity: errorMsgVisibility ? 1 : 0},
            styles.errorLblScaling,
          ]}>
          {errorMsg}
        </Text>

        <Button
          style={[
            s`w-8/12 self-center justify-center rounded-full`,
            styles.elevationBtn,
            styles.btnScaling,
          ]}
          labelStyle={[s`text-base`, styles.btnFont]}
          mode="contained"
          onPress={handleSignup}
          buttonColor="black"
          textColor="white">
          {strings.RegisterScreen.btnLable}
        </Button>

        <TouchableOpacity onPress={handleTextClick}>
          <Text style={[s`self-center`, styles.alredyHaveAccScaling]}>
            {strings.RegisterScreen.alredyHaveAcc1}
            <Text style={s`text-blue-700`}>
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
    //mb-1 mt-9
    marginTop: moderateVerticalScale(60),
  },
  welcomeTextScaling: {
    //text-3xl mr-12 mb-10
    fontSize: scale(22),
    marginRight: moderateScale(35),
    marginBottom: moderateVerticalScale(30),
    opacity: 0.5,
    fontFamily: 'bahnschrift Static',
  },
  loaderScaling: {
    //mb-10
    marginBottom: moderateVerticalScale(30),
  },
  lblScaling: {
    //mb-3 ml-10 text-xl
    marginBottom: moderateVerticalScale(15),
    marginLeft: moderateScale(40),
    fontSize: scale(18),
    fontFamily: 'bahnschrift',
  },
  inputScaling: {
    width: '80%',
    marginBottom: moderateVerticalScale(20),
  },
  errorLblScaling: {
    // ml-10 text-base mb-7
    marginLeft: moderateScale(40),
    fontSize: scale(13),
    marginBottom: moderateVerticalScale(50),
  },
  btnScaling: {
    //mb-10
    marginBottom: moderateVerticalScale(30),
    height: verticalScale(40),
  },
  alredyHaveAccScaling: {
    //  text-lg mb-8
    fontSize: scale(15),
    fontFamily: 'bahnschrift',
  },
  btnFont: {
    fontFamily: 'bahnschrift Static',
  }
});

export default Signup;
