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
import * as Progress from 'react-native-progress';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../application/redux/Store.redux';
import {signup} from '../../application/redux/asyncThunk/Auth.asyncThunk';
import {SignupRequest} from '../../domain/models/auth.models';
import {validateCredentialsSignup} from '../utils/ValidateUserInput.utils';
import {setToken} from '../utils/TokenManager';

// svg image
import SignupImage from '../assets/images/svj/signup_title.svg';

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
    <ScrollView style={s`flex-auto`} showsVerticalScrollIndicator={false}>
      <SignupImage style={s`self-center mb-1 mt-9`} width={330} height={110} />

      <Text style={s`text-3xl font-light self-end mr-12 mb-10`}>
        {strings.RegisterScreen.welcomeMsg1}
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
          {strings.RegisterScreen.usernameLbl}
        </Text>

        <CustomTextInput
          containerStyle={[s`w-11/12 self-center mb-9`, styles.elevation]}
          placeholder={strings.RegisterScreen.usernameHint}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={s`text-xl text-black mb-3 ml-6`}>
          {strings.RegisterScreen.emailLbl}
        </Text>

        <CustomTextInput
          containerStyle={[s`w-11/12 self-center mb-9`, styles.elevation]}
          placeholder={strings.RegisterScreen.emailHint}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={s`text-xl text-black mb-3 ml-6`}>
          {strings.RegisterScreen.passwordLbl}
        </Text>

        <CustomTextInput
          containerStyle={[s`w-11/12 self-center mb-7`, styles.elevation]}
          placeholder={strings.RegisterScreen.passwordHint}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text
          style={[
            s`text-red-600 ml-6 text-base mb-7`,
            {opacity: errorMsgVisibility ? 1 : 0},
          ]}>
          {errorMsg}
        </Text>

        <Button
          style={[
            s`w-80 h-12 self-center rounded-3xl mb-8`,
            styles.elevationBtn,
          ]}
          labelStyle={s`text-base`}
          mode="contained"
          onPress={handleSignup}
          buttonColor="black"
          textColor="white">
          {strings.RegisterScreen.btnLable}
        </Button>

        <TouchableOpacity onPress={handleTextClick}>
          <Text style={s`self-center text-lg mb-8`}>
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
});

export default Signup;
