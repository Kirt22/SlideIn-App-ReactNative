import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {signin, signup} from '../asyncThunk/Auth.asyncThunk';

const initState = {
  isSignedIn: false,
  token: '',
  loader: false,
  errorStrSignup: '',
  errorStrSignin: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
      state.isSignedIn = true;
      state.token = action.payload.data.token;
      state.loader = false;
    });

    builder.addCase(signup.pending, (state, action: PayloadAction<any>) => {
      state.loader = true;
    });

    builder.addCase(signup.rejected, (state, action: PayloadAction<any>) => {
      state.loader = false;
      state.errorStrSignup = action.payload as string;
    });

    builder.addCase(signin.fulfilled, (state, action: PayloadAction<any>) => {
      state.isSignedIn = true;
      state.token = action.payload.data.token;
      state.loader = false;
    });

    builder.addCase(signin.pending, (state, action: PayloadAction<any>) => {
      state.loader = true;
    });

    builder.addCase(signin.rejected, (state, action: PayloadAction<any>) => {
      state.loader = false;
      state.errorStrSignin = action.payload as string;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
