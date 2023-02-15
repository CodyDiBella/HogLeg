const initialState = {
    campus: null,
    students: [],
    loading: true,
    error: null,
  };
  
  const SingleCampusReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CAMPUS':
        return {
          ...state,
          campus: action.payload,
          students: action.payload.students,
          loading: false,
          error: null,
        };
      case 'ADD_STUDENT':
        return {
          ...state,
          students: [...state.students, action.payload],
          loading: false,
          error: null,
        };
      case 'EDIT_STUDENT':
        return {
          ...state,
          students: state.students.map(student =>
            student.id === action.payload.id ? action.payload : student
          ),
          loading: false,
          error: null,
        };
      case 'DELETE_STUDENT':
        return {
          ...state,
          students: state.students.filter(student => student.id !== action.payload),
          loading: false,
          error: null,
        };
      case 'SET_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default SingleCampusReducer;
  