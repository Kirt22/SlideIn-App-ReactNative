import {createAsyncThunk} from '@reduxjs/toolkit';

import {SignupRequest, SigninRequest} from '../../../domain/models/auth.models';

import {signUp, signIn} from '../../../infrastructure/api/auth/auth.api';

export const signup = createAsyncThunk(
  'signup',
  async (payload: SignupRequest, {rejectWithValue}) => {
    try {
      const response = await signUp(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const signin = createAsyncThunk(
  'signin',
  async (payload: SigninRequest, {rejectWithValue}) => {
    try {
      const response = await signIn(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); 
    }
  },
);
