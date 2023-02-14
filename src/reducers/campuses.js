import { createSlice } from '@reduxjs/toolkit';

const campusesSlice = createSlice({
  name: 'campuses',
  initialState: {
    list: []
  },
  reducers: {
    addCampus(state, action) {
      const newCampus = action.payload;
      state.list.push(newCampus);
    },
    removeCampus(state, action) {
      const campusId = action.payload;
      state.list = state.list.filter(campus => campus.id !== campusId);
    },
    updateCampus(state, action) {
      const updatedCampus = action.payload;
      const index = state.list.findIndex(campus => campus.id === updatedCampus.id);
      if (index !== -1) {
        state.list[index] = updatedCampus;
      }
    }
  }
});

export const { addCampus, removeCampus, updateCampus } = campusesSlice.actions;
