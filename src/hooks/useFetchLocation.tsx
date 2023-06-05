import { useState, useEffect, useRef } from "react";

export function useFetchLocation(street: string, city: string, state: string, zip: string) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
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
        const response = await fetch(`https://nominatim.org/reverse?address=${street}, ${city}, ${state}, ${zip}`);
        const data = await response.json();
        const { lat, long } = data.features[0].geometry.location;
        if( isMountedRef.current ){
            setLatitude(lat);
            setLongitude(long);
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
  }, [street, city, zip]);

  return { latitude, longitude, loadingStatus, error };
}


  
