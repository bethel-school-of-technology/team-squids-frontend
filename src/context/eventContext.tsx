import axios from "axios";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { AllChurches, Church } from "./churchContext";
import Location from "../interfaces/Location";

export interface Event {
  eventId: number;
  churchId: number;
  eventTitle: string;
  date: Date;
  location: Location
  eventType:
    | "Family"
    | "Youth"
    | "Young Adults"
    | "Single"
    | "Womans"
    | "Mens"
    | "Senior";
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewEvent {
  churchId: number;
  eventTitle: string;
  date: Date;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  eventType:
    | "Family"
    | "Youth"
    | "Young Adults"
    | "Single"
    | "Womans"
    | "Mens"
    | "Senior";
  description: string;
  imageUrl: string;
}

export interface AllEvents {
  eventId: number;
  churchId: number;
  eventTitle: string;
  date: Date;
  location: Location
  eventType:
    | "Family"
    | "Youth"
    | "Young Adults"
    | "Single"
    | "Womans"
    | "Mens"
    | "Senior";
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  Church: AllChurches;
}

export interface OneEvent {
  eventId: number;
  churchId: number;
  eventTitle: string;
  date: Date;
  location: Location
  eventType:
    | "Family"
    | "Youth"
    | "Young Adults"
    | "Single"
    | "Womans"
    | "Mens"
    | "Senior";
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  Church: Church;
  Events: AllEvents[];
}

interface EventContextProps {
  events: AllEvents[];
  setEvents: Dispatch<SetStateAction<AllEvents[]>>;
  getAllEvents: () => Promise<void>;
  createEvent: (newEvent: NewEvent) => Promise<NewEvent>;
  getEvent: (eventId: number) => Promise<OneEvent>;
  updateEvent: (updatedEvent: Event) => Promise<Event>;
  deleteEvent: (eventId: number) => Promise<Event>;
}

interface EventContextProviderProps {
  children: ReactNode;
}

export const EventContext = createContext<EventContextProps>({
  events: [],
  setEvents: () => {},
  getAllEvents: () => Promise.resolve(),
  createEvent: (newEvent: NewEvent) => Promise.resolve(newEvent),
  getEvent: (eventId: number) => Promise.resolve({} as OneEvent),
  updateEvent: (updatedEvent: Event) => Promise.resolve(updatedEvent),
  deleteEvent: (eventId: number) => Promise.resolve({} as Event),
});

const BASE_URL = "http://localhost:3000/api/event/";

export const EventProvider = ({ children }: EventContextProviderProps) => {
  const [events, setEvents] = useState<AllEvents[]>([]);

  const getAllEvents = async () => {
    try {
      const response = await axios.get(BASE_URL);
      setEvents(response.data);
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  useEffect(() => {
    (async () => {
      await getAllEvents();
    })();
  }, []);

  const createEvent = async (newEvent: NewEvent) => {
    try {
      const response = await axios.post(BASE_URL, newEvent);
      await getAllEvents();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const getEvent = async (eventId: number) => {
    const eventIdURL = `${BASE_URL}${eventId}`;
    try {
      const response = await axios.get(eventIdURL);
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const updateEvent = async (updatedEvent: Event) => {
    const eventIdURL = `${BASE_URL}${updatedEvent.eventId}`;
    try {
      const response = await axios.put(eventIdURL, updatedEvent);
      await getAllEvents();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  const deleteEvent = async (eventId: number) => {
    const eventIdURL = `${BASE_URL}${eventId}`;
    try {
      const response = await axios.delete(eventIdURL);
      await getAllEvents();
      return response.data;
    } catch (error: any) {
      throw error.response.statusText;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        getAllEvents,
        createEvent,
        getEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
