import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EventList from "../Events/EventsLists";
import { oneChurch } from "../../context/churchContext";
import { oneEvent } from "../../context/eventContext";

interface ContainerProps {
  data: oneEvent;
}

const EventInfo: React.FC<ContainerProps> = ({ data }) => {
  const {
    eventId,
    churchId,
    eventTitle,
    eventDate,
    eventStreet,
    eventCity,
    eventState,
    eventZip,
    eventType,
    description,
    imageUrl,
    createdAt,
    updatedAt,
    Church,
    Events
  } = data;

  const isoDate = data ? new Date(eventDate) : null;
  const formatDate = Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  const formatDay = Intl.DateTimeFormat("en-us", {
    weekday: "long",
  });
  const formatTime = Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });
  const date = isoDate ? formatDate.format(isoDate) : "";
  const day = isoDate ? formatDay.format(isoDate) : "";
  const time = isoDate ? formatTime.format(isoDate) : "";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{eventTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonImg className="hero-img" src={imageUrl} alt={eventTitle} />
            </IonCol>
            <IonCol size="12">
              <h1>{eventTitle}</h1>
              <IonText color="primary">
                <h6>{Church[0].churchName}</h6>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <IonText color="primary">
                <h6>{day}</h6>
              </IonText>
              <h4>{date}</h4>
              <IonText color="medium">
                <p>{time}</p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Location</h4>
              <IonText color="medium">
                <p>
                  {eventStreet} <br />
                  {eventCity}, {eventState}{" "}
                  {eventZip}
                </p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <IonText color="medium">
                <p>{description}</p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Contact Information</h4>
              <a href={`https://www.${Church[0].website}`}>
                <p>{Church[0].churchEmail}</p>
              </a>
              <IonText color="medium">
                <p>{Church[0].phoneNumber}</p>
              </IonText>
            </IonCol>
            <IonCol size="12">
            <h4>Other Upcoming Events</h4>
            <EventList data={Events} churchName={Church[0].churchName} />
            </IonCol>
            <IonCol size="12">
              <a href={`mailto:${Church[0].churchEmail}`}>
                <IonButton expand="block">Connect with Us</IonButton>
              </a>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EventInfo;
