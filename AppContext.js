"use client";

import { createContext, useReducer } from "react";

const initialState = {
  authToken: "",
  user: null,
};

const reducer = (state, action) => {
  switch (action?.type) {
    case "SET_CURRENT_USER":
      localStorage?.setItem("USER", JSON.stringify(action?.data));
      return {
        ...state,
        user: action?.data,
      };
    case "LOGOUT":
      localStorage?.removeItem("TOKEN");
      localStorage?.removeItem("USER");
      return { ...state, user: null };
    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCurrentUser = () =>
    // eslint-disable-next-line no-undef
    localStorage.getItem("USER")
      ? // eslint-disable-next-line no-undef
        JSON?.parse(localStorage.getItem("USER"))
      : {};

  const initializeAuth = (authToken, userData) => {
    if (authToken) {
      localStorage?.setItem("TOKEN", authToken);
      dispatch({ type: "SET_CURRENT_USER", data: userData });
    }
  };

  const value = {
    state,
    dispatch,
    initializeAuth,
    getCurrentUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext?.Consumer;

export { AppContext, AppContextConsumer, AppContextProvider };
