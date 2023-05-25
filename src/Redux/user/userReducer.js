// userReducer.js

import {
    UPDATE_PROFILE_PICTURE,
    UPDATE_USERNAME,
    UPDATE_PREFERENCES,
  } from './userActions';
  
  const initialState = {
    profilePicture: '',
    username: '',
    preferences: {},
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_PICTURE:
        return {
          ...state,
          profilePicture: action.payload,
        };
      case UPDATE_USERNAME:
        return {
          ...state,
          username: action.payload,
        };
      case UPDATE_PREFERENCES:
        return {
          ...state,
          preferences: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  