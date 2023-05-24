import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import EventItem from "../components/Events/EventItem";
import { useContext } from "react";
import { EventContext } from "../context/eventContext";

const EventFinder: React.FC = () => {
  const { events } = useContext(EventContext);
  const renderEventList = () => {
    return events.map((e) => (
      <EventItem data={e} key={e.eventId} />
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Event List</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>{renderEventList()}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default EventFinder;
