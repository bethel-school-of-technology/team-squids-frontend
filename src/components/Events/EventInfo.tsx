import React from 'react';
import { IonCol, IonImg, IonRow, IonText } from "@ionic/react";
import { OneEvent } from "../../context/eventContext";

interface EventInfoProps {
  data: OneEvent;
}

const EventInfo: React.FC<EventInfoProps> = ({
  data: {
    eventId,
    churchId,
    eventTitle,
    location: { street, city, state, zip },
    date,
    eventType,
    description,
    imageUrl,
    createdAt,
    updatedAt,
    Church,
    Events, 
  }
}) => {

  const isoDate = date ? new Date(date) : null;
  const formatDate = Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  const formatDay = Intl.DateTimeFormat("en-us", {
    weekday: "long",
  });
  const formatTime = Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });

  const eventDate = isoDate ? formatDate.format(isoDate) : "";
  const eventDay = isoDate ? formatDay.format(isoDate) : "";
  const eventTime = isoDate ? formatTime.format(isoDate) : "";

  return (
    <IonRow>
      <IonCol size="12">
        <IonImg className="hero-img" src={imageUrl} alt={eventTitle} />
      </IonCol>
      <IonCol size="12">
        <h1>{eventTitle}</h1>
        <p>{eventDay}</p>
        <IonText color="primary">
          <h6>{Church.churchName} | {eventType}</h6>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Date and Time</h4>
        <IonText color="medium">
          <p>{eventDay}, {eventDate} at {eventTime}</p>
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
      <IonCol size="12">
        <h4>Description</h4>
        <IonText color="medium">
          <p>{description}</p>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Contact Information</h4>
        <a href={`https://${Church.website}`}>
          <p>{Church.churchEmail}</p>
        </a>
        <IonText color="medium">
          <p>{Church.phoneNumber}</p>
        </IonText>
      </IonCol>
    </IonRow>
  );
};

export default EventInfo;
