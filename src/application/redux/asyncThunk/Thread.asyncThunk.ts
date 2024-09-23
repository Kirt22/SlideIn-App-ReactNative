import {createAsyncThunk} from '@reduxjs/toolkit';

import {generateResponseRequest} from '../../../domain/models/thread.models';

import {
  getThreads,
  getGeneratedPrompts,
  deteleThread,
  generateResponse,
} from '../../../infrastructure/api/home/thread.api';

export const GetThreads = createAsyncThunk(
  'getThreads',
  async (_, {rejectWithValue}) => {
    try {
      const response = await getThreads();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const GenerateResponse = createAsyncThunk(
  'generateResponse',
  async (payload: generateResponseRequest, {rejectWithValue}) => {
    try {
      const response = await generateResponse(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const GetGeneratedPrompts = createAsyncThunk(
  'getGeneratedPrompts',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await getGeneratedPrompts(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const DeleteThread = createAsyncThunk(
  'deleteThread',
  async (id: string, {rejectWithValue}) => {
    try {
      const response = await deteleThread(id);
      return {response, id} ;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
