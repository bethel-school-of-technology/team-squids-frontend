import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext } from "react";
import { EventContext } from "../context/eventContext";
import EventsList from "../components/Events/EventsLists";

const EventFinder: React.FC = () => {
  const { events, searchEvents, getAllEvents  } = useContext(EventContext);

  const handleSearch = async (searchQuery: string) => {
    // Call function to search locations base on query
    await searchEvents(searchQuery)
  };

  const handleClear = async () => {
    await getAllEvents();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Event Finder</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar onIonChange={(e) => handleSearch(e.detail.value!)} 
          onIonClear={handleClear}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <EventsList events={events} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EventFinder;
