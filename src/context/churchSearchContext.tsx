import axios from "axios";
import Location from "../interfaces/Location";
import { ReactNode, createContext } from "react";


interface SearchContextProps{
  searchResults: SearchResults[] // Define type of results of search
  searchChurch: (query: string) => Promise<void>;
};

interface SearchResults{
  location: string;
  // Do we want to seach by anything else?
}


export const SearchChurchContext = createContext<SearchContextProps>({
  searchResults: [],
  searchChurch: () => Promise.resolve(),

});



interface SeachContextProviderProps {
  children: ReactNode;
}


const BASE_URL = "http://localhost:3000/api/church/search";

export const SearchChurchContextProvider: React.FC<SeachContextProviderProps> = ({ children }) => {
  const searchChurch = async ( query: string ) => {
  try {
    const repsonse = await axios.get(`${BASE_URL}${query}`);
    // Process response & update search results
  } catch (error: any) {
      throw error.response.statusText;
    }
};

const contextValue: SearchContextProps = {
 searchResults: [], // Initialize w/ empty arr or defult value
 searchChurch
}

return (
  <SearchChurchContext.Provider
    value={
    contextValue
    }
  >
    {children}
  </SearchChurchContext.Provider>
);
};
