import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import campusesReducer from "../reducers/campuses";
import campusReducer from "../reducers/campus";
import singleCampusReducer from "../reducers/singleCampus";

const rootReducer = combineReducers({
  campuses: campusesReducer,
  campus: campusReducer,
  singleCampus: singleCampusReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
