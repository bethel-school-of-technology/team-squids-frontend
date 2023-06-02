import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { ChurchContext, OneChurch } from "../context/churchContext";

const useFetchChurch = (churchId: number) => {
  const { getChurch: getContextChurch } = useContext(ChurchContext);
  const [church, setChurch] = useState<OneChurch | undefined>();
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const isMountedRef = useRef<boolean | null>(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const getChurch = useCallback(getContextChurch, []);  // if getContextChurch doesn't have dependencies

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);
        const oneChurch = await getChurch(churchId);
        if (isMountedRef.current) {
          setChurch(oneChurch);
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
  }, [churchId, getChurch]);  // getChurch reference won't cause unnecessary re-renders

  return { church, loadingStatus, error };
};

export { useFetchChurch };
