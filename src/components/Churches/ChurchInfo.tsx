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
import { OneChurch } from "../../context/churchContext";

interface ContainerProps {
  data: OneChurch;
}

const ChurchInfo: React.FC<ContainerProps> = ({ data }) => {
  const {
    userId,
    churchName,
    denomination,
    location,
    phoneNumber,
    churchEmail,
    welcomeMessage,
    serviceTime,
    imageUrl,
    website,
    Events,
  } = data;

  const { street, city, state, zip } = location;

  console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{churchName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
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
            <IonCol size="12">
              <h4>Upcoming Events</h4>
              <EventList events={Events} />
            </IonCol>
            <IonCol size="12">
              <a href={`mailto:${churchEmail}`}>
                <IonButton expand="block">Connect with Us</IonButton>
              </a>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChurchInfo;
