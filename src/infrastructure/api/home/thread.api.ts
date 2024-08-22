import axios from 'axios';

import {Constants} from '../../../presentation/utils/Constant.utils';
import {
  deteleThreadResponse,
  generateResponseRequest,
  generatedResponse,
  thread,
} from '../../../domain/models/thread.models';

import {getToken} from '../../../presentation/utils/TokenManager';

export const getThreads = async (): Promise<[thread]> => {
  try {
    const response = await axios.get(`${Constants.BASE_URL}/thread/get`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Unknown error', error);
    throw new Error('Something went wrong!');
  }
};

export const getGeneratedPrompts = async (
  id: String,
): Promise<[generatedResponse]> => {
  try {
    const response = await axios.get(
      `${Constants.BASE_URL}/thread/get/responses`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data: {id},
      },
    );
    return response.data;
  } catch (error) {
    console.error('Unknown error', error);
    throw new Error('Something went wrong!');
  }
};

export const generateResponse = async (
  data: generateResponseRequest,
): Promise<generatedResponse> => {
  try {
    const response = await axios.post<generatedResponse>(
      `${Constants.BASE_URL}/thread/generate`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Unknown error', error);
    throw new Error('Something went wrong!');
  }
};

export const deteleThread = async (
  id: string,
): Promise<deteleThreadResponse> => {
  try {
    const response = await axios.delete<deteleThreadResponse>(
      `${Constants.BASE_URL}/thread/generate`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        data: {id},
      },
    );
    return response.data;
  } catch (error) {
    console.error('Unknown error', error);
    throw new Error('Something went wrong!');
  }
};
