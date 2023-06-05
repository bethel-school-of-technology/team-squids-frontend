import React, { useEffect, useState } from "react";
import { IonCol, IonImg, IonRow, IonText } from "@ionic/react";
import { OneChurch } from "../../context/churchContext";
import { useFetchLocation } from "../../hooks/useFetchLocation";

interface ChurchInfoProps {
  data: OneChurch;
}

const ChurchInfo: React.FC<ChurchInfoProps> = ({
  data: {
    churchName,
    denomination,
    location: { street, city, state, zip },
    phoneNumber,
    churchEmail,
    welcomeMessage,
    serviceTime,
    imageUrl,
    website,
  },
}) => {

  // const [ latitude, setLatitude ] = useState<number | null>(null);
  // const [ longitude, setLongitude ] = useState<number | null>(null);
  
  // const getLocationCor = async () => {
  //   try {
  //     const response = await fetch(`https://nominatim.org/reverse?address=${street}, ${city}, ${zip}`);
  //     const data = await response.json();
  //     const {lat, long} = data.features[0].geoemtry.location;
  //     setLatitude(lat);
  //     setLongitude(long);
  //   } catch (error: any) {
  //       throw error.response.statusText;
  //   }
  // }
  
  // useEffect(() => {
  //   getLocationCor();
  //   }, []);

  const apiKey = process.env.REACT_APP_API_Key;

  const { latitude, longitude } = useFetchLocation( street, city, state, zip );
  
  const stasticMap = latitude && longitude
  ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=12&size=600x400&key=${apiKey}`
  : "";
  
  return (
    <IonRow>
      <IonCol size="12">
        <IonImg className="hero-img" src={imageUrl} alt={churchName} />
      </IonCol>
      <IonCol size="12">
        <h1>{churchName}</h1>
        <IonText color="primary">
          <h6>{denomination}</h6>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Service Times</h4>
        <IonText color="medium">
          <p>{serviceTime}</p>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Location</h4>
        <IonText color="medium">
          <p>
            {street} <br />
            {city}, {state} {zip}
          </p>
        </IonText>
      <IonCol>
        <img src={stasticMap}> </img>
      </IonCol>
      </IonCol>
      <IonCol size="12">
        <h4>Contact Information</h4>
        <a href={`https://${website}`}>
          <p>{churchEmail}</p>
        </a>
        <IonText color="medium">
          <p>{phoneNumber}</p>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Welcome to {churchName}</h4>
        <IonText color="medium">
          <p>{welcomeMessage}</p>
        </IonText>
      </IonCol>
    </IonRow>
  );
};

export default ChurchInfo;
