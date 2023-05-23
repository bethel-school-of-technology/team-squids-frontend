import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface User {
  userId: number;
  email: string;
  password: string;
}

export interface newUser {
  email: string;
  password: string;
}

interface UserContextProps {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  getAllUsers: () => Promise<void>;
  createUser: (newUser: newUser) => Promise<newUser>;
  getUser: (userId: number) => Promise<User>;
  updateUser: (updatedUser: User) => Promise<User>;
  deleteUser: (userId: number) => Promise<User>;
}

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps>({
  users: [],
  setUsers: () => {},
  getAllUsers: () => Promise.resolve(),
  createUser: (newUser: newUser) => Promise.resolve(newUser),
  getUser: (userId: number) => Promise.resolve({} as User),
  updateUser: (updatedUser: User) => Promise.resolve(updatedUser),
  deleteUser: (userId: number) => Promise.resolve({} as User),
});

const BASE_URL = "http://localhost:3000/api/user/";

export const UserProvider = ({ children }: UserContextProviderProps) => {
  const [users, setUsers] = useState<User[]>([]);

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

  const createUser = async (newUser: newUser) => {
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

  const updateUser = async (updatedUser: User) => {
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
