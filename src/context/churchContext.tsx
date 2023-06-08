import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { ChurchUser, authHeader } from "./churchUserContext";
import { AllEvents } from "./eventContext";
import Location from "../interfaces/Location";
import { queryAllByAltText } from "@testing-library/react";

export interface Church {
  churchId: number;
  userId: number;
  churchName: string;
  denomination: string;
  location: Location;
  phoneNumber: string;
  churchEmail: string;
  welcomeMessage: string;
  serviceTime: string;
  imageUrl: string;
  website: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewChurch {
  userId: number;
  churchName: string;
  denomination: string;
  location: Location;
  phoneNumber: string;
  churchEmail: string;
  welcomeMessage: string;
  serviceTime: string;
  imageUrl: string;
  website: string;
}

export interface AllChurches extends Church {
  ChurchUser: ChurchUser;
}

export interface OneChurch extends Church {
  Events: AllEvents[];
  ChurchUser: ChurchUser;
}

interface ChurchContextProps {
  churches: AllChurches[];
  setChurches: Dispatch<SetStateAction<AllChurches[]>>;
  getAllChurches: () => Promise<void>;
  createChurch: (newChurch: NewChurch) => Promise<NewChurch>;
  getChurch: (churchId: number) => Promise<OneChurch>;
  updateChurch: (updatedChurch: Church) => Promise<Church>;
  deleteChurch: (churchId: number) => Promise<Church>;
  searchChurches: (query: string) => Promise<void>;
}

interface ChurchContextProviderProps {
  children: ReactNode;
}

export const ChurchContext = createContext<ChurchContextProps>({
  churches: [],
  setChurches: () => {},
  getAllChurches: () => Promise.resolve(),
  createChurch: (newChurch: NewChurch) => Promise.resolve(newChurch),
  getChurch: (churchId: number) => Promise.resolve({} as OneChurch),
  updateChurch: (updatedChurch: Church) => Promise.resolve(updatedChurch),
  deleteChurch: (churchId: number) => Promise.resolve({} as Church),
  searchChurches: (query: string) => Promise.resolve(),
});

const BASE_URL = "http://localhost:3000/api/church/";

export const ChurchProvider = ({ children }: ChurchContextProviderProps) => {
  const [churches, setChurches] = useState<AllChurches[]>([]);

  const getAllChurches = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setChurches(response.data);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  useEffect(() => {
    (async () => {
      await getAllChurches();
    })();
  }, []);

  const createChurch = async (newChurch: NewChurch) => {
    try {
      const response = await axios.post(BASE_URL, newChurch, {
        headers: authHeader(),
      });
      await getAllChurches();
      return await response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const getChurch = async (churchId: number) => {
    const churchIdURL = `${BASE_URL}${churchId}`;
    try {
      const response = await axios.get(churchIdURL);
      return await response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const updateChurch = async (updatedChurch: Church) => {
    const churchIdURL = `${BASE_URL}${updatedChurch.churchId}`;
    try {
      const response = await axios.put(churchIdURL, updatedChurch, {
        headers: authHeader(),
      });
      await getAllChurches();
      return await response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const deleteChurch = async (churchId: number) => {
    const churchIdURL = `${BASE_URL}${churchId}`;
    try {
      const response = await axios.delete(churchIdURL, {
        headers: authHeader(),
      })
      await getAllChurches();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const searchChurches = async (query: string) => {
    if (query === "") {
      return
    }
    const searchChurchUrl = `${BASE_URL}search/${query}`
    try {
      const response = await axios.get(searchChurchUrl);
      setChurches(response.data);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  useEffect(() => {
    (async () => {
      await searchChurches('');
    })();
  }, []);

  return (
    <ChurchContext.Provider
      value={{
        churches,
        setChurches,
        getAllChurches,
        createChurch,
        getChurch,
        updateChurch,
        deleteChurch,
        searchChurches,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};
