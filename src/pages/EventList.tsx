import {
    IonContent,
    IonHeader,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
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
   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
    },
    {
      eventId: 2,
   eventTitle: "Gosepel Concert",
   churchName: "Second Church",
   eventDay: "Friday",
   eventDate: "5-19-23",
   eventTime: "7:00 PM",
   eventAddress: "123 Second Street",
   eventType: "Family",
   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
    }
  ] 

  const EventList: React.FC = () => {
    const renderEventList = () => {
      return events.map((event) => (
        <EventItem data={event} key={event.eventId} />
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
          <IonList>
            {renderEventList()}
          </IonList>
        </IonContent>
      </IonPage>
    );

  };
  
  export default EventList;