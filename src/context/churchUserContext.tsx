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
  // churchUsers: ChurchUser[];
  // setChurchUsers: Dispatch<SetStateAction<ChurchUser[]>>;
  // getAllChurchUsers: () => Promise<void>;
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
  // churchUsers: [],
  // setChurchUsers: () => {},
  // getAllChurchUsers: () => Promise.resolve(),
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
const LOGIN_TOKEN = localStorage.getItem("myChurchUserToken");

export const authHeader = { Authorization: `Bearer ${LOGIN_TOKEN}` };

export const ChurchUserProvider = ({ children }: UserContextProviderProps) => {
  // const [churchUsers, setChurchUsers] = useState<ChurchUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const getAllChurchUsers = async () => {
  //   try {
  //     const response: AxiosResponse<ChurchUser[]> = await axios.get(BASE_URL);
  //     setChurchUsers(response.data);
  //   } catch (error: any) {
  //     throw error.response.statusText;
  //   }
  // };

  useEffect(() => {
    (async () => {
      await verifyCurrentUser();
    })();
  }, []);

  const createChurchUser = async (newUser: NewChurchUser) => {
    try {
      const response = await axios.post(BASE_URL, newUser);
      // await getAllChurchUsers();
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
      // await getAllChurchUsers();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const deleteChurchUser = async (userId: number) => {
    const userIdURL = `${BASE_URL}${userId}`;
    try {
      await axios.delete(userIdURL);
      // await getAllChurchUsers();
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const loginChurchUser = async (churchUser: NewChurchUser) => {
    const churchUserURL = `${BASE_URL}login`;
    setIsLoggedIn(true);

    try {
      const response = await axios.post(churchUserURL, churchUser);
      if (response.status === 200) {
        localStorage.setItem("myChurchUserToken", response.data.token);
        await verifyCurrentUser();
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
          headers: authHeader,
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("myChurchUserToken");
        setIsLoggedIn(false);
      } else {
        throw new Error("Unable to log out.");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const verifyCurrentUser = async () => {
    if (!LOGIN_TOKEN) {
      setCurrentUserId(0);
    } else {
      let decoded: decoded = await jwt_decode(LOGIN_TOKEN);
      setCurrentUserId(decoded.userId);
    }
  };
  return (
    <ChurchUserContext.Provider
      value={{
        // churchUsers,
        // setChurchUsers,
        // getAllChurchUsers,
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
