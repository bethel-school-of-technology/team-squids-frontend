import {
    IonContent,
    IonHeader,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  
  
  
  const EventsList: React.FC = () => {
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Events</IonTitle>
          </IonToolbar>
          <IonToolbar color="primary">
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          
        </IonContent>
      </IonPage>
    );
  };
  
  export default EventsList;
  