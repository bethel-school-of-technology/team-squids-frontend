import { IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import React from "react";
import PageHeader from "../components/Global/PageHeader";

const AddEvent: React.FC = () => {
  return (
    <IonPage>
      <PageHeader header="Create an Event" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div>Create an Event</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddEvent;
