import {View, Text, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {s} from 'react-native-wind';

// svg image
import SignupImage from '../assets/images/svj/signup_title.svg';

const signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={s`bg-pink-500 flex-auto`}>
      <View style={s`items-center`}>
        <SignupImage width={350} height={200} style={s`self-center`} />
      </View>

      <View>
        <Text style={s`text-xl text-black mb-5 ml-6`}>Username</Text>

        <TextInput
          style={s`w-11/12 h-12 border rounded-3xl px-2.5 self-center mb-5`}
          placeholder="Your name"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={s`text-xl text-black mb-5 ml-6`}>Email</Text>

        <TextInput
          style={s`w-11/12 h-12 border rounded-3xl px-2.5 self-center mb-5`}
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={s`text-xl text-black mb-5 ml-6`}>Password</Text>

        <TextInput
          style={s`w-11/12 h-12 border rounded-3xl px-2.5 self-center mb-5`}
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer1: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default signup;
