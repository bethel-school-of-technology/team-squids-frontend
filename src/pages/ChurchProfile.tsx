import React, { useContext, useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Church, ChurchContext } from "../context/churchContext";
import { useParams } from "react-router-dom";
import "./ChurchProfile.css";
import EventItem from "../components/EventFinder/EventItem";
import { Event } from "../context/eventContext";

let events: Event[] = [
  {
    eventId: 1,
    eventTitle: "Potluck Dinner",
    churchName: "First Church",
    eventDay: "Thursday",
    eventDate: "5-18-23",
    eventTime: "6:30 PM",
    eventAddress: "123 First Street",
    eventType: "Family",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
  },
  {
    eventId: 2,
    eventTitle: "Gospel Concert",
    churchName: "Second Church",
    eventDay: "Friday",
    eventDate: "5-19-23",
    eventTime: "7:00 PM",
    eventAddress: "123 Second Street",
    eventType: "Family",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.",
  },
];

interface ChurchRouteParams {
  churchId: string;
}

const ChurchProfile: React.FC = () => {
  const params = useParams<ChurchRouteParams>();
  const { getChurch } = useContext(ChurchContext);
  const [selectedChurch, setSelectedChurch] = useState<Church | undefined>();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const church = await getChurch(parseInt(params.churchId));
        setSelectedChurch(church);
      } catch (error) {
        setError((error as Error).message);
      }
    }

    fetchData();
  }, [params.churchId, getChurch]);

  const loading = () => {
    return <IonLoading isOpen={true} />;
  };

  const renderEventList = () => {
    return events.map((event) => (
      <EventItem data={event} key={event.eventId} />
    ));
  };

  const handleConnectClick = () => {
    window.location.href = `mailto:${selectedChurch?.churchEmail}`;
  };

  const churchDetails = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{selectedChurch?.churchName}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg
                  className="hero-img"
                  src={selectedChurch?.imageUrl}
                  alt={selectedChurch?.churchName}
                />
              </IonCol>
              <IonCol size="12">
                <h1>{selectedChurch?.churchName}</h1>
                <IonText color="primary">
                  <h6>{selectedChurch?.denomination}</h6>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Service Times</h4>
                <IonText color="medium">
                  <p>{selectedChurch?.serviceTime}</p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Location</h4>
                <IonText color="medium">
                  <p>
                    {selectedChurch?.street} <br />
                    {selectedChurch?.city}, {selectedChurch?.state}{" "}
                    {selectedChurch?.zip}
                  </p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Contact Information</h4>
                <a href={`https://${selectedChurch?.website}`}>
                  <p>{selectedChurch?.churchEmail}</p>
                </a>
                <IonText color="medium">
                  <p>{selectedChurch?.phoneNumber}</p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Welcome to {selectedChurch?.churchName}</h4>
                <IonText color="medium">
                  <p>{selectedChurch?.welcomeMessage}</p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Upcoming Events</h4>
                <div className="event-list">{renderEventList()}</div>
              </IonCol>
              <IonCol size="12">
                <IonButton expand="block" onClick={handleConnectClick}>
                  Connect with Us
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };

  return !selectedChurch ||
    selectedChurch.churchId !== parseInt(params.churchId)
    ? loading()
    : churchDetails();
};

export default ChurchProfile;
