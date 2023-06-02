import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { EventContext, OneEvent } from "../context/eventContext";

const useFetchEvent = (eventId: number) => {
  const { getEvent: getContextEvent } = useContext(EventContext);
  const [event, setEvent] = useState<OneEvent | undefined>();
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const isMountedRef = useRef<boolean | null>(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getEvent = useCallback(getContextEvent, []);  // if getContextEvent doesn't have dependencies

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);
        const oneEvent = await getEvent(eventId);
        if (isMountedRef.current) {
          setEvent(oneEvent);
          setLoadingStatus(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setError(error instanceof Error ? error.message : String(error));
          setLoadingStatus(false);
        }
      }
    };

    fetchData();
  }, [eventId, getEvent]);  // getEvent reference won't cause unnecessary re-renders

  return { event, loadingStatus, error };
};

export { useFetchEvent };
