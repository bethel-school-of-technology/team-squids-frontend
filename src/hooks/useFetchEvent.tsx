import { useContext, useEffect, useState, useRef } from "react";
import { EventContext, OneEvent } from "../context/eventContext";

const useFetchEvent = (eventId: number) => {
  const { getEvent } = useContext(EventContext);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);
        const oneEvent = await getEvent(eventId);
        if (isMountedRef.current) {
          setEvent(oneEvent);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (isMountedRef.current) {
          setLoadingStatus(false);
        }
      }
    };

    fetchData();
  }, [eventId, getEvent]);

  return { event, loadingStatus, error };
};

export { useFetchEvent };
