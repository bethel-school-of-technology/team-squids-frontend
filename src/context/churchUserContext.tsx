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
}

export interface NewChurchUser {
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

interface UserContextProps {
  currentUserId: number;
  setCurrentUserId: Dispatch<SetStateAction<number>>;
  createChurchUser: (newUser: NewChurchUser) => Promise<NewChurchUser>;
  getChurchUser: (userId: number) => Promise<OneChurchUser>;
  updateChurchUser: (updatedUser: ChurchUser) => Promise<ChurchUser>;
  deleteChurchUser: (userId: number) => Promise<void>;
  loginChurchUser: (churchUser: NewChurchUser) => Promise<any>;
  logoutChurchUser: () => Promise<void>;
  isLoggedIn: boolean;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const ChurchUserContext = createContext<UserContextProps>({
  currentUserId: 0,
  setCurrentUserId: () => {},
  createChurchUser: (newUser: NewChurchUser) => Promise.resolve(newUser),
  getChurchUser: (userId: number) => Promise.resolve({} as OneChurchUser),
  updateChurchUser: (updatedUser: ChurchUser) => Promise.resolve(updatedUser),
  deleteChurchUser: (userId: number) => Promise.resolve(),
  loginChurchUser: (churchUser: NewChurchUser) => Promise.resolve({}),
  logoutChurchUser: () => Promise.resolve(),
  isLoggedIn: false,
});

const BASE_URL = "http://localhost:3000/api/user/";

export const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("myChurchUserToken")}`,
});

export const ChurchUserProvider = ({ children }: UserContextProviderProps) => {
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const verifyCurrentUser = async () => {
    const LOGIN_TOKEN = localStorage.getItem("myChurchUserToken");
    if (!LOGIN_TOKEN) {
      setCurrentUserId(0);
    } else {
      let decoded: decoded = await jwt_decode(LOGIN_TOKEN);
      setCurrentUserId(decoded.userId);
    }
  };

  useEffect(() => {
    (async () => {
      await verifyCurrentUser();
    })();
  }, []);

  const createChurchUser = async (newUser: NewChurchUser) => {
    try {
      const response = await axios.post(BASE_URL, newUser);
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const getChurchUser = async (userId: number) => {
    const userIdURL = `${BASE_URL}${userId}`;
    try {
      const response = await axios.get(userIdURL);
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const updateChurchUser = async (updatedUser: ChurchUser) => {
    const userIdURL = `${BASE_URL}${updatedUser.userId}`;
    try {
      const response = await axios.put(userIdURL, updatedUser);
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const deleteChurchUser = async (userId: number) => {
    const userIdURL = `${BASE_URL}${userId}`;
    try {
      await axios.delete(userIdURL);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const loginChurchUser = async (churchUser: NewChurchUser) => {
    const churchUserURL = `${BASE_URL}login`;

    try {
      const response = await axios.post(churchUserURL, churchUser);
      if (response.status === 200) {
        localStorage.setItem("myChurchUserToken", response.data.token);
        await verifyCurrentUser();
        setIsLoggedIn(true);
        return response.data;
      } else {
        throw new Error("Unable to log in.");
      }
    } catch (error: any) {
      setIsLoggedIn(false);
      throw error;
    }
  };

  const logoutChurchUser = async () => {
    const logoutURL = `${BASE_URL}logout`;
    try {
      const response = await axios.post(
        logoutURL,
        {},
        {
          headers: authHeader(),
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("myChurchUserToken");
        setIsLoggedIn(false);
        setCurrentUserId(0);
      } else {
        throw new Error("Unable to log out.");
      }
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <ChurchUserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        createChurchUser,
        getChurchUser,
        updateChurchUser,
        deleteChurchUser,
        loginChurchUser,
        logoutChurchUser,
        isLoggedIn,
      }}
    >
      {children}
    </ChurchUserContext.Provider>
  );
};
