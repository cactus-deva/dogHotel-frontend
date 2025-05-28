import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | null;
  userId: string | null;
  name: string | null;
  username: string | null;
  setAuthData: (authData: AuthContextProps) => void;
  clearAuthData?: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    const savedName = localStorage.getItem("name");
    const savedUsername = localStorage.getItem("username");

    if (savedToken) setToken(savedToken);
    if (savedUserId) setUserId(savedUserId);
    if (savedName) setName(savedName);
    if (savedUsername) setUsername(savedUsername);
  }, []);

  const setAuthData = ({ token, userId, name, username }: AuthContextProps) => {
    setToken(token);
    setUserId(userId);
    setName(name);
    setUsername(username);

    if (token) localStorage.setItem("token", token);
    if (userId) localStorage.setItem("userId", userId);
    if (name) localStorage.setItem("name", name);
    if (username) localStorage.setItem("username", username);
  };

  const clearAuthData = () => {
    setToken(null)
    setUserId(null)
    setName(null)
    setUsername(null)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
    value={{token, userId, name, username, setAuthData, clearAuthData}}>
        {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must use under <AuthProvider>")
    return context;    
}