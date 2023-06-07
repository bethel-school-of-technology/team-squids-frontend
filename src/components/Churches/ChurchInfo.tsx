import React, { useEffect, useState } from "react";
import { IonCol, IonImg, IonRow, IonText } from "@ionic/react";
import { OneChurch } from "../../context/churchContext";


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


  const apiKey = 'AIzaSyBzMxAntTwImXe9Du0J042nG09954Ww980';

  const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${street},${city},${state}&markers=${street},${city},${state}&zoom=14&size=600x400&key=${apiKey}`

  
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
        </IonCol>
      <IonCol>
        <IonImg src={staticMap} alt="staticMap"> </IonImg>
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
