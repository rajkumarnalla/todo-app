import { combineReducers } from 'redux';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
