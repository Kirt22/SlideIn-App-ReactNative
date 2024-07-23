import axios from 'axios';

import {
  SignupRequest,
  SignupResponse,
  SigninRequest,
  SigninResponse,
} from '../../../domain/models/auth.models';

import {Constants} from '../../../presentation/utils/Constant.utils';

interface ErrorResponse {
  error: string;
}

export const signUp = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await axios.post<SignupResponse>(
      `${Constants.BASE_URL}/users/signup`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = (error.response.data as {message: string}).message;
      throw new Error(errorMessage);
    } else {
      console.error('Unknown error', error);
      throw new Error('Unknown error');
    }
  }
};

export const signIn = async (
  data: SigninRequest,
): Promise<SigninResponse | ErrorResponse> => {
  try {
    const response = await axios.post<SigninResponse>(
      `${Constants.BASE_URL}/users/signin`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = (error.response.data as {message: string}).message;
      return {error: errorMessage};
    } else {
      console.error('Unknown error', error);
      return {error: 'Unknown error'};
    }
  }
};
