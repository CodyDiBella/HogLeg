/* Here is where you will configure the store 

*/ 

import { configureStore } from "@reduxjs/toolkit";
import campusesReducer from "../reducers/campuses";
import React from 'react';
import ReactDOM from 'react-dom';


const store = configureStore({
  reducer: {
    campuses: campusesReducer,
  },
});

export default store;
