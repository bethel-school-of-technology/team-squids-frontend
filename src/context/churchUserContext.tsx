import axios from "axios";
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

export interface AllChurchUsers {
  userId: number;
  email: string;
  password: string;
}

export interface OneChurchUser {
  email: string;
  password: string;
  Churches: OneChurch[];
}

interface UserContextProps {
  users: AllChurchUsers[];
  setUsers: Dispatch<SetStateAction<AllChurchUsers[]>>;
  getAllUsers: () => Promise<void>;
  createUser: (newUser: NewChurchUser) => Promise<NewChurchUser>;
  getUser: (userId: number) => Promise<ChurchUser>;
  updateUser: (updatedUser: ChurchUser) => Promise<ChurchUser>;
  deleteUser: (userId: number) => Promise<ChurchUser>;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
  getAllUsers: () => Promise.resolve(),
  createUser: (newUser: NewChurchUser) => Promise.resolve(newUser),
  getUser: (userId: number) => Promise.resolve({} as ChurchUser),
  updateUser: (updatedUser: ChurchUser) => Promise.resolve(updatedUser),
  deleteUser: (userId: number) => Promise.resolve({} as ChurchUser),
});

const BASE_URL = "http://localhost:3000/api/user/";

export const UserProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<AllChurchUsers[]>([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setUsers(response.data);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, []);

  const createUser = async (newUser: NewChurchUser) => {
    try {
      const response = await axios.post(BASE_URL, newUser);
      await getAllUsers();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const getUser = async (userId: number) => {
    const userIdURL = `${BASE_URL}${userId}`;
    try {
      const response = await axios.get(userIdURL);
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const updateUser = async (updatedUser: ChurchUser) => {
    const userIdURL = `${BASE_URL}${updatedUser.userId}`;
    try {
      const response = await axios.put(userIdURL, updatedUser);
      await getAllUsers();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const deleteUser = async (userId: number) => {
    const userIdURL = `${BASE_URL}${userId}`;
    try {
      const response = await axios.delete(userIdURL);
      await getAllUsers();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        getAllUsers,
        createUser,
        getUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
