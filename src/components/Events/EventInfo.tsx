import React from "react";
import { IonCol, IonImg, IonRow, IonText } from "@ionic/react";
import { OneEvent } from "../../context/eventContext";
import styles from "../../theme/info.module.css";

interface EventInfoProps {
  data: OneEvent;
}

const EventInfo: React.FC<EventInfoProps> = ({
  data: {
    eventTitle,
    location: { street, city, state, zip },
    date,
    eventType,
    description,
    imageUrl,
    Church,
  },
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

  const apiKey = "AIzaSyBzMxAntTwImXe9Du0J042nG09954Ww980";

  const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${street},${city},${state}&markers=${street},${city},${state}&zoom=14&size=600x400&key=${apiKey}`;

  return (
    <IonRow className={styles.light}>
      <IonCol size="12">
        <IonImg className={styles.heroImg} src={imageUrl} alt={eventTitle} />
      </IonCol>
      <IonCol size="12">
        <IonText color="secondary">
          <h6>{eventType}</h6>
        </IonText>
        <h1 className={styles.title}>{eventTitle}</h1>
        <IonText color="secondary">
          <h6>{Church.churchName}</h6>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <h4>Date and Time</h4>

        <p>
          {eventDay}, {eventDate} at {eventTime}
        </p>
      </IonCol>
      <IonCol size="12">
        <h4>Location</h4>

        <p>
          {street} <br />
          {city}, {state} {zip}
        </p>
      </IonCol>
      <IonCol>
        <IonImg src={staticMap} alt="staticMap">
          {" "}
        </IonImg>
      </IonCol>
      <IonCol size="12">
        <h4>Description</h4>

        <p>{description}</p>
      </IonCol>
      <IonCol size="12" >
        <h4>Contact Information</h4>
        <a href={`https://${Church.website}`} className={styles.link}>
          <p>{Church.churchEmail}</p>
        </a>

        <p>{Church.phoneNumber}</p>
      </IonCol>
    </IonRow>
  );
};

export default EventInfo;
