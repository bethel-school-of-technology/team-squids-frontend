import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChurchContext } from "./churchContext";
import Location from "../interfaces/Location"

interface LocationContextProps {
  locations: Location[];
  setLocations: Dispatch<SetStateAction<Location[]>>;
  getAllLocations: () => Promise<void>;
  searchLocations: (searchQuery: string) => Promise<void>;
}

interface LocationContextProviderProps {
  children: ReactNode;
}

export const LocationContext = createContext<LocationContextProps>({
  locations: [],
  setLocations: () => {},
  getAllLocations: () => Promise.resolve(),
  searchLocations: (searchQuery: string) => Promise.resolve(),
});

const BASE_URL = "http://localhost:3000/api/locations/";

export const LocationProvider: React.FC<LocationContextProviderProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const churchContext = useContext(ChurchContext);

  const getAllLocations = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setLocations(response.data);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  useEffect(() => {
    (async () => {
      await getAllLocations();
    })();
  }, []);

  const searchLocations = async (searchQuery: string) => {
    try {
      const response = await axios.get(`${BASE_URL}?q=${searchQuery}`);
      const filteredLocations = response.data.filter((location: Location) => {
        return [location.street, location.city, location.state, location.zip]
          .some((property) => property.toLowerCase().includes(searchQuery.toLowerCase()));
      });
      setLocations(filteredLocations);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };
  

  return (
    <LocationContext.Provider
      value={{
        locations,
        setLocations,
        getAllLocations,
        searchLocations,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
