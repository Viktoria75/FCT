

// import React, { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// interface AuthContextProps {
//   children: React.ReactNode;
// }

// interface AuthContextType {
//   authenticated: boolean;
//   userId: string | null;
//   token: string | null;
//   userRole: 'user' | 'admin' | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [token, setToken] = useState<string | null>(null); // Add this line
//   const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

//   const API_URL = 'http://localhost:5000/api/users';

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setAuthenticated(true);
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       // const response = await axios.post(`${API_URL}/login`, { email, password });
//       const response = await axios.post<{ token: string; userId: string, userRole: "user" | "admin" | null }>(`${API_URL}/login`, { email, password });
//       const { token: authToken, userId, userRole } = response.data;
//       localStorage.setItem('token', authToken);
//       setToken(authToken); // Update the token state
//       setUserId(userId);
//       setAuthenticated(true);
//       setUserRole(userRole);
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw new Error('Login failed');
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthenticated(false);
//     setUserId(null);
//     setUserRole(null);
//     setToken(null); // Reset the token state
//   };

//   return (
//     <AuthContext.Provider value={{ authenticated, userId, token, userRole, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthContextType {
  authenticated: boolean;
  userId: string | null;
  token: string | null;
  userRole: 'user' | 'admin' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setAuthenticated(true);
      const userRole = localStorage.getItem('userRole');
      const userId = localStorage.getItem('userId');
      if (userRole) {
        setUserRole(userRole as 'user' | 'admin');
      }
      if (userId) {
        setUserId(userId);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; userId: string; userRole: 'user' | 'admin' }>(`${API_URL}/users/login`, { email, password });
      const { token: authToken, userId, userRole } = response.data;
      localStorage.setItem('token', authToken);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', userId);
      setToken(authToken);
      setUserId(userId);
      setAuthenticated(true);
      setUserRole(userRole);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setAuthenticated(false);
    setUserId(null);
    setUserRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, userId, token, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
