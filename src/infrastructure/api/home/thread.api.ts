import axios from 'axios';

import {Constants} from '../../../presentation/utils/Constant.utils';
import {
  deteleThreadResponse,
  generateResponseRequest,
  generatedResponse,
  thread,
} from '../../../domain/models/thread.models';

import {getToken} from '../../../presentation/utils/TokenManager.utils';

export const getThreads = async (): Promise<[thread]> => {
  const token = await getToken();
  try {
    const response = await axios.get(`${Constants.BASE_URL}/thread/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Unknown error', error);
    throw new Error('Token Not Found!');
  }
};

export const getGeneratedPrompts = async (
  id: String,
): Promise<[generatedResponse]> => {
  const token = await getToken();
  try {
    const response = await axios.get(
      `${Constants.BASE_URL}/thread/get/responses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  const token = await getToken();
  try {
    const response = await axios.post<generatedResponse>(
      `${Constants.BASE_URL}/thread/generate`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
  const token = await getToken();
  try {
    const response = await axios.delete<deteleThreadResponse>(
      `${Constants.BASE_URL}/thread/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Unknown error', error);
    throw new Error('Something went wrong!');
  }
};
