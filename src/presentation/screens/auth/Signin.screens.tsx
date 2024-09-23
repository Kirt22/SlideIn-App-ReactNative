import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import {RootState, AppDispatch} from '../../../application/redux/Store.redux';
import {SigninRequest} from '../../../domain/models/auth.models';
import {validateCredentialsSignin} from '../../utils/ValidateUserInput.utils';
import {setToken} from '../../utils/TokenManager.utils';

// svg image
import SigninImage from '../../assets/images/svj/signin_title_figma.svg';

// strings import
import {strings} from '../../assets/strings/strings';

// components import
import CustomTextInput from '../../components/CustomTextInput.componentes';
import {signin} from '../../../application/redux/asyncThunk/Auth.asyncThunk';

const Signin = ({navigation}: any) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loaderVisiblity, setLoaderVisiblity] = useState(false);
  const [errorMsgVisibility, setErrorMsgVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {errorStrSignin, loader, token, isSignedIn} = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLoaderVisiblity(loader);
  }, [loader]);

  useEffect(() => {
    if (errorStrSignin) {
      setErrorMsgVisibility(true);
      setErrorMsg(errorStrSignin);
    }
  }, [errorStrSignin]);

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

  const handleSignin = () => {
    let signinreq: SigninRequest = {email, password};
    const validate = validateCredentialsSignin(signinreq);
    if (!validate.isValid) {
      setErrorMsgVisibility(true);
      setErrorMsg(validate.message);
      return;
    }
    // dispatching the signup action
    dispatch(signin(signinreq));
    setLoaderVisiblity(loader);
    setErrorMsgVisibility(true);
    setErrorMsg(errorStrSignin);
  };

  const handleText1Click = () => {
    navigation.navigate('SignUp');
  };

  const handleText2Click = () => {};

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={{alignSelf: 'center'}}>
        <SigninImage
          style={[{alignSelf: 'center'}, styles.singinInmageScaling]}
          width={scale(300)}
          height={verticalScale(70)}
        />

        <Text style={[{alignSelf: 'flex-end'}, styles.welcomeTextScaling]}>
          {strings.SigninScreen.welcomeMsg1}
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
          {strings.SigninScreen.emailLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            {alignSelf: 'center'},
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.SigninScreen.emailHint}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[{color: 'black'}, styles.lblScaling]}>
          {strings.SigninScreen.passwordLbl}
        </Text>

        <CustomTextInput
          containerStyle={[
            {alignSelf: 'center'},
            styles.elevation,
            styles.inputScaling,
          ]}
          placeholder={strings.SigninScreen.passwordHint}
          value={password}
          secureTextEntry={true}
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
          onPress={handleSignin}
          buttonColor="black"
          textColor="white">
          {strings.SigninScreen.btnLable}
        </Button>

        <TouchableOpacity onPress={handleText1Click}>
          <Text style={[{alignSelf: 'center'}, styles.dontHaveAccScaling]}>
            {strings.SigninScreen.dontHaveAcc1}
            <Text style={{color: '#2700E0'}}>
              {' '}
              {strings.SigninScreen.dontHaveAcc2}
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleText2Click}>
          <Text style={[{alignSelf: 'center'}, styles.forgotPassScaling]}>
            {strings.SigninScreen.forgotPassword}
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
  singinInmageScaling: {
    marginTop: verticalScale(60),
  },
  welcomeTextScaling: {
    //text-3xl mr-12 mb-10
    fontSize: scale(22),
    fontFamily: 'Roboto-Medium',
    opacity: 0.5,
    marginBottom: verticalScale(30),
  },
  loaderScaling: {
    //mb-10
    marginBottom: verticalScale(30),
  },
  lblScaling: {
    //mb-3 ml-10 text-xl
    marginBottom: verticalScale(15),
    marginLeft: scale(50),
    fontSize: scale(18),
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
    marginBottom: verticalScale(50),
    height: verticalScale(40),
  },
  dontHaveAccScaling: {
    fontSize: scale(18),
    marginBottom: verticalScale(20),
  },
  forgotPassScaling: {
    fontSize: scale(17),
    fontFamily: 'Roboto-Regular',
  },
  btnFont: {
    fontFamily: 'Roboto-Bold',
    fontSize: scale(15),
  },
});
export default Signin;
