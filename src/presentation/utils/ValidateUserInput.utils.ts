import {SignupRequest, SigninRequest} from '../../domain/models/auth.models';

interface returnType {
  isValid: boolean;
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCredentialsSignup = (input: SignupRequest): returnType => {
  if (input.email === '' || input.password === '' || input.username === '') {
    return {
      isValid: false,
      message: 'Please provide the credentials',
    };
  } else if (!emailRegex.test(input.email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address.',
    };
  } else if (input.password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long.',
    };
  }

  return {
    isValid: true,
    message: 'Credentials are valid',
  };
};

export const validateCredentialsSignin = (input: SigninRequest): returnType => {
  if (input.email === '' || input.password === '') {
    return {
      isValid: false,
      message: 'Please provide the credentials',
    };
  } else if (!emailRegex.test(input.email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address.',
    };
  } else if (input.password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long.',
    };
  }

  return {
    isValid: true,
    message: 'Credentials are valid',
  };
};
