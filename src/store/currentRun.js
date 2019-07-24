import { createSlice } from 'redux-starter-kit';

const currentRunSlice = createSlice({
  slice: 'currentRun',
  initialState: -1,
  reducers: {
    setCurrentRun(state, action) {
      return action.payload.id;
    },
  },
});

export const { actions, reducer } = currentRunSlice;

export default reducer;
