import { createSlice } from 'redux-starter-kit';

const userSlice = createSlice({
  slice: 'user',
  initialState: {},
  reducers: {
    login(state, action) {
      console.log('STORE: ', action.payload);

      return action.payload.user;
    },
    updateUser(state, action) {
      const newUserState = state;
      Object.keys(action.payload).forEach((key) => {
        (newUserState[key] = action.payload[key]);
      });
      return newUserState;
    },
    logout(state, action) {
      return {};
    },
  },
});
export const { actions, reducer } = userSlice;

export default reducer;
