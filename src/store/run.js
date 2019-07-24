import { createSlice } from 'redux-starter-kit';

const runSlice = createSlice({
  slice: 'run',
  initialState: {},
  reducers: {
    setRun(state, action) {
      return action.payload;
    },
    setGpx(state, action) {
      const newState = state;
      newState.gpx = action.payload;
      return newState;
    },
    setRunData(state, action) {
      const newState = state;
      newState.run = action.payload;
      return newState;
    },
  },
});

export const { actions, reducer } = runSlice;

export default reducer;
