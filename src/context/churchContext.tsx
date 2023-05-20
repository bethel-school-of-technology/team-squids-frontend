import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export interface Church {
  churchId: number;
  churchName: string;
  denomination: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  servicesTimes: string;
  contactName: string;
  website: string;
  welcomeMessage: string;
  imageURL: string;
}

export interface newChurch {
  churchName: string;
  denomination: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  servicesTimes: string;
  contactName: string;
  website: string;
  welcomeMessage: string;
  imageURL: string;
}

interface ChurchContextProps {
  churches: Church[];
  setChurches: Dispatch<SetStateAction<Church[]>>;
  getAllChurches: () => Promise<void>;
  createChurch: (newChurch: newChurch) => Promise<newChurch>;
  getChurch: (churchId: number) => Promise<Church>;
  updateChurch: (updatedChurch: Church) => Promise<Church>;
  deleteChurch: (churchId: number) => Promise<Church>;
}

interface ChurchContextProviderProps {
  children: ReactNode;
}

export const ChurchContext = createContext<ChurchContextProps>({
  churches: [],
  setChurches: () => {},
  getAllChurches: () => Promise.resolve(),
  createChurch: (newChurch: newChurch) => Promise.resolve(newChurch),
  getChurch: (churchId: number) => Promise.resolve({} as Church),
  updateChurch: (updatedChurch: Church) => Promise.resolve(updatedChurch),
  deleteChurch: (churchId: number) => Promise.resolve({} as Church),
});

export const ChurchProvider = ({ children }: ChurchContextProviderProps) => {
  const [churches, setChurches] = useState<Church[]>([]);

  const baseURL = "http://localhost:3000/api/church/";

  const getAllChurches = async () => {
    try {
      const response = await axios.get(baseURL);
      return setChurches(response.data);
    } catch (error: any) {
      return await Promise.reject(error.response.statusText);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getAllChurches();
    }
    fetchData();
  }, []);

  const createChurch = async (newChurch: newChurch) => {
    try {
      const response = await axios.post(baseURL, newChurch);
      await getAllChurches();
      return await response.data;
    } catch (error: any) {
      return await Promise.reject(error.response.statusText);
    }
  };

  const getChurch = async (churchId: number) => {
    const churchIdURL = `${baseURL}${churchId}`;
    try {
      const response = await axios.get(churchIdURL);
      return await response.data;
    } catch (error: any) {
      return await Promise.reject(error.response.statusText);
    }
  };

  const updateChurch = async (updatedChurch: Church) => {
    const churchIdURL = `${baseURL}${updatedChurch.churchId}`;
    try {
      const response = await axios.put(churchIdURL, updatedChurch);
      await getAllChurches();
      return await response.data;
    } catch (error: any) {
      return await Promise.reject(error.response.statusText);
    }
  };

  const deleteChurch = async (churchId: number) => {
    const churchIdURL = `${baseURL}${churchId}`;
    try {
      const response = await axios.delete(churchIdURL);
      await getAllChurches();
      return await response.data;
    } catch (error: any) {
      return await Promise.reject(error.response.statusText);
    }
  };

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
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};
