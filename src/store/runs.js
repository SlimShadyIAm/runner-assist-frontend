import { createSlice } from 'redux-starter-kit';

const runsSlice = createSlice({
  slice: 'runs',
  initialState: [],
  reducers: {
    setRunList(state, action) {
      return action.payload;
    },
  },
});

export const { actions, reducer } = runsSlice;

export default reducer;
