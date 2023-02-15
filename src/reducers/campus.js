const initialState = {
    campuses: [],
    campus: null,
    loading: true,
    error: null,
  };
  
  const campusReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CAMPUSES':
        return {
          ...state,
          campuses: action.payload,
          loading: false,
          error: null,
        };
      case 'SET_CAMPUS':
        return {
          ...state,
          campus: action.payload,
          loading: false,
          error: null,
        };
      case 'ADD_CAMPUS':
        return {
          ...state,
          campuses: [...state.campuses, action.payload],
          loading: false,
          error: null,
        };
      case 'EDIT_CAMPUS':
        return {
          ...state,
          campuses: state.campuses.map(campus =>
            campus.id === action.payload.id ? action.payload : campus
          ),
          loading: false,
          error: null,
        };
      case 'DELETE_CAMPUS':
        return {
          ...state,
          campuses: state.campuses.filter(campus => campus.id !== action.payload),
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
  
  export default campusReducer;
  