import React from 'react';
//import sinupImg from '../assets/jpg/signip_img.jpeg';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const SignupScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require(sinupImg)}
        style={styles.titleImage}
        resizeMode="contain"
      /> */}

      <Text style={styles.label}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </View>

      <Text style={styles.errorMsg} id="errorMsgSu"></Text>

      <Button
        title="Sign Up"
        onPress={() => {}}
        color="#000"
      />

      <Text style={styles.secondaryText}>Already have an account? Sign in</Text>
      <Text style={styles.secondaryText}>Welcome!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  titleImage: {
    width: 323,
    height: 120,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginTop: 32,
    fontFamily: 'sans-serif-light',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    width: '90%',
    minHeight: 48,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
  },
  errorMsg: {
    fontSize: 15,
    marginTop: 32,
    color: '#ff0000',
    alignSelf: 'center',
    fontFamily: 'sans-serif-light',
  },
  signUpButton: {
    marginTop: 32,
    height: 60,
  },
  secondaryText: {
    fontSize: 18,
    marginTop: 16,
    fontFamily: 'sans-serif-medium',
    color: '#ff0000',
  },
});

export default SignupScreen;
