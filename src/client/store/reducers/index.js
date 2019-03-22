import { combineReducers } from 'redux';
import bizToolbarReducer from './bizToolbar';
import bizTableReducer from './bizTable';

export default combineReducers({
  bizToolbar: bizToolbarReducer,
  bizTable: bizTableReducer
});
