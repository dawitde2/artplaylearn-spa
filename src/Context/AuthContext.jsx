import { createContext, useContext, useState } from "react";
import { authService } from "./authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.getUser());

  const login = async (email, password) => {
    await authService.login(email, password);
    setUser(authService.getUser());
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: authService.isAuthenticated(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
