// userActions.js

export const UPDATE_PROFILE_PICTURE = 'UPDATE_PROFILE_PICTURE';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

export const updateProfilePicture = (pictureUrl) => {
  return {
    type: UPDATE_PROFILE_PICTURE,
    payload: pictureUrl,
  };
};

export const updateUsername = (username) => {
  return {
    type: UPDATE_USERNAME,
    payload: username,
  };
};

export const updatePreferences = (preferences) => {
  return {
    type: UPDATE_PREFERENCES,
    payload: preferences,
  };
};
