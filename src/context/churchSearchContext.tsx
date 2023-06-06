import axios from "axios";
import Location from "../interfaces/Location";
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ChurchContext } from "./churchContext";

interface ChurchLocationContextProps {
  locations: Location[]// Define type of results of search 
  setLocations: Dispatch<SetStateAction<Location[]>>
  getAllLocations: () => Promise<void>;
  searchLocations: (searchQuery: string) => Promise<void>;
};


export const ChurchLocationContext = createContext<ChurchLocationContextProps>({
  locations: [],
  setLocations: () => { },
  getAllLocations: () => Promise.resolve(),
  searchLocations: (searchQuery: string) => Promise.resolve(),

});



interface LocationContextProviderProps {
  children: ReactNode;
}


const BASE_URL = "http://localhost:3000/api/church/search";

export const ChurchLocationProvider: React.FC<LocationContextProviderProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const allChurches = useContext(ChurchContext);

  const getAllLocations = async () => {
    try {
      const repsonse = await axios.get(`${BASE_URL}`);
      setLocations(repsonse.data);
      // Process response & update search results
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
      const reponse = await axios.get(`${BASE_URL}?q=${searchQuery}`);
      const filterLocations = reponse.data.filter((locaction: Location) => {
        return allChurches.churches.some((church) =>
          church.churchName.includes(searchQuery)
        );
      });
      // try {
      //   const response = await axios.get(`${BASE_URL}?q=${searchQuery}`);
      //   const filteredLocations = response.data.filter((location: Location) => {
      //     return [location.street, location.city, location.state, location.zip]
      //       .some((property) => property.toLowerCase().includes(searchQuery.toLowerCase()));
      //   });
      setLocations(filterLocations);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  return (
    <ChurchLocationContext.Provider
      value={
        {
          locations,
          setLocations,
          getAllLocations,
          searchLocations,
        }}
    >
      {children}
    </ChurchLocationContext.Provider>
  );
};
