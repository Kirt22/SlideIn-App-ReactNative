import axios from 'axios'

import { SignupRequest, SignupResponse, SigninRequest, SigninResponse } from '../../../domain/models/auth.models'

import { Constants } from '../../../presentation/utils/Constant.utils'

export const signUp = async (data: SignupRequest): Promise<SignupResponse> => {
    try {
        const response = await axios.post<SignupResponse>(`${Constants.BASE_URL}/user/signup`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const signIn = async (data: SigninRequest): Promise<SigninResponse> => {
    try {
        const response = await axios.post<SigninResponse>(`${Constants.BASE_URL}/user/signin`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}