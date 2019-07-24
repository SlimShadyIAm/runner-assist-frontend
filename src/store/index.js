import { configureStore } from 'redux-starter-kit';
import userReducer from './user';
import runsReducer from './runs';
import runReducer from './run';
import currentRunReducer from './currentRun';

const reducers = {
  user: userReducer,
  runs: runsReducer,
  run: runReducer,
  currentRun: currentRunReducer,
};

const store = configureStore({
  reducer: reducers,
});

export default store;
