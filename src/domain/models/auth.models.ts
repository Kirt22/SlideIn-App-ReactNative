export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface SigninResponse {
  sucess: boolean;
  data: {
    user: {
      _id: string;
      username: string;
      password: string;
      email: string;
      score: Int16Array;
      uses: Int16Array;
      subscription: string;
      createdAt: string;
      updatedAt: string;
      __v: Int16Array;
    };
    token: string;
  };
}

export interface SignupResponse {
  sucess: boolean;
  data: {
    user: {
      username: string;
      password: string;
      email: string;
      score: Int32Array;
      uses: Int16Array;
      subscription: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: Int16Array;
    };
    token: string;
  };
}
