import * as Keychain from 'react-native-keychain';

export const setToken = async (token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword('token', token);    
    } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
    }
}

export const getToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword();
        return credentials? credentials.password : null;
    } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
        return null;
    }
}

export const deleteToken = async (): Promise<void> => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.log('Keychain couldn\'t be accessed!', error);
    }
}