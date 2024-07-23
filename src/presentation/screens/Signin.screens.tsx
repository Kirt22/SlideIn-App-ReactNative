import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {s} from 'react-native-wind';
import {Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';
import {RootState, AppDispatch} from '../../application/redux/Store.redux';
import {SigninRequest} from '../../domain/models/auth.models';
import {validateCredentialsSignin} from '../utils/ValidateUserInput.utils';
import {setToken} from '../utils/TokenManager';

// svg image
import SigninImage from '../assets/images/svj/signin_title.svg';

// strings import
import {strings} from '../assets/strings/strings';

// components import
import CustomTextInput from '../components/CustomTextInput.componentes';
import {signin} from '../../application/redux/asyncThunk/Auth.asyncThunk';

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
    <ScrollView style={s`flex-auto`} showsVerticalScrollIndicator={false}>
      <SigninImage style={s`self-center mt-16`} width={330} height={90} />

      <Text style={s`text-3xl font-light self-end mr-12 mb-10`}>
        {strings.SigninScreen.welcomeMsg1}
      </Text>

      <Progress.Bar
        style={[s`mb-10`, {opacity: loaderVisiblity ? 1 : 0}]}
        borderWidth={0}
        indeterminate={true}
        width={null}
        color="black"
        borderRadius={0}
      />

      <View>
        <Text style={s`text-xl text-black mb-3 ml-6`}>
          {strings.SigninScreen.emailLbl}
        </Text>

        <CustomTextInput
          containerStyle={[s`w-11/12 self-center mb-9`, styles.elevation]}
          placeholder={strings.SigninScreen.emailHint}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={s`text-xl text-black mb-3 ml-6`}>
          {strings.SigninScreen.passwordLbl}
        </Text>

        <CustomTextInput
          containerStyle={[s`w-11/12 self-center mb-7`, styles.elevation]}
          placeholder={strings.SigninScreen.passwordHint}
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />

        <Text
          style={[
            s`text-red-600 ml-6 text-base mb-10`,
            {opacity: errorMsgVisibility ? 1 : 0},
          ]}>
          {errorMsg}
        </Text>

        <Button
          style={[
            s`w-80 h-12 self-center rounded-3xl mb-16`,
            styles.elevationBtn,
          ]}
          labelStyle={s`text-base`}
          mode="contained"
          onPress={handleSignin}
          buttonColor="black"
          textColor="white">
          {strings.SigninScreen.btnLable}
        </Button>

        <TouchableOpacity onPress={handleText1Click}>
          <Text style={s`self-center text-lg mb-4`}>
            {strings.SigninScreen.dontHaveAcc1}
            <Text style={s`text-blue-700`}>
              {' '}
              {strings.SigninScreen.dontHaveAcc2}
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleText2Click}>
          <Text style={s`self-center text-lg mb-8`}>
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
});

export default Signin;
