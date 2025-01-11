import { createContext } from "react";

const AuthContext = createContext({
  userId: null,
  setUserId: () => {},
  userRole: null,
  setUserRole: () => {},
});

export default AuthContext;
