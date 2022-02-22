import { createContext, useContext, useState } from "react";
import { api, addAuthHeader, removeAuthHeader } from "../api";

addAuthHeader();

const AuthContext = createContext({});

export const AuthController = (props) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [error, setError] = useState(null);

  //Log In function
  const logIn = async (email, password, onSuccess) => {
    setError(null);
    const response = await api.post(
      "/users/login",
      { email, password },
      { validateStatus: () => true }
    );
    if (response.status === 200) {
      setUserData(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      addAuthHeader();
      if (onSuccess) {
        onSuccess();
      }
    }
    if (response.status === 400) {
      setError(response.data.error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    removeAuthHeader();
    setUserData(null);
  };
  return (
    <AuthContext.Provider value={{ userData, logIn, error, logOut }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
