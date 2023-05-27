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
import { ChurchContext } from "../context/churchContext";
import { useContext, useState } from "react";
import ChurchList from "../components/Churches/ChurchList";

const ChurchFinder: React.FC = () => {
  const { churches } = useContext(ChurchContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Church Finder</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <ChurchList churches={churches} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChurchFinder;
