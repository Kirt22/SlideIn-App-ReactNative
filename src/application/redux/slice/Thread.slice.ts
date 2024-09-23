import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  GenerateResponse,
  GetGeneratedPrompts,
  GetThreads,
  DeleteThread,
} from '../asyncThunk/Thread.asyncThunk';

const initState = {
  threads: [],
  loader: false,
  errorStr: '',
  generatedPrompts: [],
};

const threadSlice = createSlice({
  name: 'thread',
  initialState: initState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      GetThreads.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.threads = action.payload;
      },
    );

    builder.addCase(GetThreads.pending, (state, action: PayloadAction<any>) => {
      state.loader = true;
    });

    builder.addCase(
      GetThreads.rejected,
      (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.errorStr = action.payload as string;
      },
    );

    builder.addCase(
      DeleteThread.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.threads = state.threads.filter(
          (thread: any) => thread._id !== action.payload.id,
        );
      },
    );

    builder.addCase(
      DeleteThread.pending,
      (state, action: PayloadAction<any>) => {
        state.loader = true;
      },
    );

    builder.addCase(
      DeleteThread.rejected,
      (state, action: PayloadAction<any>) => {
        state.loader = false;
        state.errorStr = action.payload as string;
      },
    );
  },
});

export const {} = threadSlice.actions;

export default threadSlice.reducer;
