import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {s} from 'react-native-wind';
import {TextInput, Button} from 'react-native-paper';
import * as Progress from 'react-native-progress';

// svg image
import SignupImage from '../assets/images/svj/signup_title.svg';

// strings import
import {strings} from '../assets/strings/strings';

// components import
import CustomTextInput from '../components/CustomTextInput';

const signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScrollView style={s`flex-auto`} showsVerticalScrollIndicator={false}>
      <SignupImage style={s`self-center mb-8 mt-9`} width={300} height={100} />

      <Progress.Bar
        style={s`mb-10`}
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

        <Text style={s`text-red-600 ml-6 text-base mb-12`}>Error</Text>

        <Button
          style={[
            s`w-80 h-12 self-center rounded-3xl mb-8`,
            styles.elevationBtn,
          ]}
          labelStyle={s`text-base`}
          mode="contained"
          buttonColor="black"
          textColor="white">
          {strings.RegisterScreen.btnLable}
        </Button>

        <Text style={s`self-center text-blue-700 text-base mb-8`}>
          Already Registered? Sign In Instead!
        </Text>

        <Text style={s`self-center text-lg font-extralight`}>
          {strings.RegisterScreen.welcomeMsg1}
        </Text>

        <Text style={s`self-center text-lg font-extralight`}>
          {strings.RegisterScreen.welcomeMsg2}
        </Text>
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

export default signup;
