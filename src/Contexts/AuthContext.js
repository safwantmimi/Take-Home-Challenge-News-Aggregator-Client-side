import React from "react";

const authData = {
  signedIn: false,
  user: {}
};

export default React.createContext({authData: {...authData}, setAuthData: (val) => {}});