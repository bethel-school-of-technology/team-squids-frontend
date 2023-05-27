import { useContext, useEffect, useState, useRef } from "react";
import { ChurchContext, OneChurch } from "../context/churchContext";


const useFetchChurch = (churchId: number) => {
  const { getChurch } = useContext(ChurchContext);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingStatus(true);
        const oneChurch = await getChurch(churchId);
        if (isMountedRef.current) {
          setChurch(oneChurch);
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
  }, [churchId, getChurch]);

  return { church, loadingStatus, error };
};

export { useFetchChurch };
