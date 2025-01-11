import React, { useContext, useState, Children } from "react";
import Context from "./Context";
import useStorage from "../utils/useStorage";

const AuthProvider = ({ children }) => {
  const [userRole, setUserRoleStorage] = useStorage("userRole");
  const [userId, setUserIdStorage] = useStorage("userId");

  const setUserId = (userId) => {
    setUserIdStorage(userId);
  };

  const setUserRole = (userRole) => {
    setUserRoleStorage(userRole);
  };

  return (
    <Context.Provider
      value={{
        userId,
        setUserId,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
