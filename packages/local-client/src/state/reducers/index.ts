import cellReducer from "./cellreducer";
import { combineReducers } from "redux";
import bundleReducer from "./bundlereducer";

const reducers = combineReducers({
  cells: cellReducer,
  bundle: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
