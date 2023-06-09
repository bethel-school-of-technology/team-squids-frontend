import axios, { AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { OneChurch } from "./churchContext";

export interface ChurchUser {
  userId: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface NewChurchUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginChurchUser {
  email: string;
  password: string;
}

export interface OneChurchUser extends ChurchUser {
  Churches: OneChurch[];
}

interface decoded {
  userId: number;
  iat: number;
  exp: number;
}

interface ChurchUserContextProps {
  currentUserId: number;
  setCurrentUserId: Dispatch<SetStateAction<number>>;
  verifyCurrentUser: () => Promise<decoded | null>;
  createChurchUser: (newUser: NewChurchUser) => Promise<NewChurchUser>;
  getChurchUser: (userId: number) => Promise<OneChurchUser>;
  updateChurchUser: (updatedUser: ChurchUser) => Promise<ChurchUser>;
  deleteChurchUser: (userId: number) => Promise<void>;
  loginChurchUser: (churchUser: LoginChurchUser) => Promise<any>;
  logoutChurchUser: () => Promise<void>;
  checkCurrentUser: (userId: string) => Promise<any>;
  isLoggedIn: boolean;
}

interface ChurchUserContextProviderProps {
  children: ReactNode;
}

export const ChurchUserContext = createContext<ChurchUserContextProps>({
  currentUserId: 0,
  setCurrentUserId: () => {},
  verifyCurrentUser: () => Promise.resolve(null),
  createChurchUser: (newUser: NewChurchUser) => Promise.resolve(newUser),
  getChurchUser: (userId: number) => Promise.resolve({} as OneChurchUser),
  updateChurchUser: (updatedUser: ChurchUser) => Promise.resolve(updatedUser),
  deleteChurchUser: (userId: number) => Promise.resolve(),
  loginChurchUser: (churchUser: LoginChurchUser) => Promise.resolve({}),
  logoutChurchUser: () => Promise.resolve(),
  checkCurrentUser: (userId: string) => Promise.resolve(),
  isLoggedIn: false,
});

const BASE_URL = "http://localhost:3000/api/user/";

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myChurchUserToken")}`,
});

export const ChurchUserProvider = ({
  children,
}: ChurchUserContextProviderProps) => {
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const verifyCurrentUser = async () => {
    const LOGIN_TOKEN = localStorage.getItem("myChurchUserToken");
    if (!LOGIN_TOKEN) {
      setCurrentUserId(0);
      setIsLoggedIn(false);
      return null;
    } else {
      try {
        const verifyUserURL = `${BASE_URL}verify-current-user`;
        const response = await axios.get(verifyUserURL, {
          headers: authHeader(),
        });
        if (response.status === 200) {
          let decoded: decoded = await jwt_decode(LOGIN_TOKEN);
          setCurrentUserId(decoded.userId);
          setIsLoggedIn(true);
          return decoded;
        } else {
          localStorage.removeItem("myChurchUserToken");
          setCurrentUserId(0);
          setIsLoggedIn(false);
          return null;
        }
      } catch (error: any) {
        localStorage.removeItem("myChurchUserToken");
        setCurrentUserId(0);
        setIsLoggedIn(false);
        return null;
      }
    }
  };

  const createChurchUser = async (newUser: NewChurchUser) => {
    const newUserURL = `${BASE_URL}create-account`;
    try {
      const response = await axios.post(newUserURL, newUser);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const getChurchUser = async (userId: number) => {
    const getUserURL = `${BASE_URL}${userId}`;
    try {
      const response = await axios.get(getUserURL);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const updateChurchUser = async (updatedUser: ChurchUser) => {
    const updateUserURL = `${BASE_URL}edit-account/${updatedUser.userId}`;
    try {
      const response = await axios.put(updateUserURL, updatedUser, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const deleteChurchUser = async (userId: number) => {
    const deleteUserURL = `${BASE_URL}delete-account${userId}`;
    try {
      await axios.delete(deleteUserURL, {
        headers: authHeader(),
      });
    } catch (error: any) {
      throw error;
    }
  };

  const loginChurchUser = async (churchUser: LoginChurchUser) => {
    const loginUserURL = `${BASE_URL}signin`;
    try {
      const response = await axios.post(loginUserURL, churchUser);
      if (response.status === 200) {
        localStorage.setItem("myChurchUserToken", response.data.token);
        await verifyCurrentUser();
        console.log(currentUserId);
        setIsLoggedIn(true);
        return response.data;
      } else {
        setIsLoggedIn(false);
        throw new Error("Unable to log in.");
      }
    } catch (error: any) {
      setIsLoggedIn(false);
      throw new Error(error.response?.data?.message || "Unable to log in.");
    }
  };

  const logoutChurchUser = async () => {
    localStorage.removeItem("myChurchUserToken");
    setCurrentUserId(0);
    setIsLoggedIn(false);
  };

  const checkCurrentUser = async (userId: string) => {
    let id = parseInt(userId);
    if (currentUserId === id) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    verifyCurrentUser();
  }, [loginChurchUser]);

  return (
    <ChurchUserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        verifyCurrentUser,
        createChurchUser,
        getChurchUser,
        updateChurchUser,
        deleteChurchUser,
        loginChurchUser,
        logoutChurchUser,
        checkCurrentUser,
        isLoggedIn,
      }}
    >
      {children}
    </ChurchUserContext.Provider>
  );
};
