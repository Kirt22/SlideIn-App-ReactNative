import * as Keychain from 'react-native-keychain';

export const setToken = async (token: string): Promise<boolean> => {
  try {
    await Keychain.setGenericPassword('token', token);
    return true
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    return false
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    return null;
  }
};

export const deleteToken = async (): Promise<boolean> => {
  try {
    await Keychain.resetGenericPassword();
    return true
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
    return false
  }
};
