import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: []
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    }
  }
});

export const { addStudent, removeStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
