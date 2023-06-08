import React, { FormEventHandler, useContext, useEffect, useState } from "react";
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
import ChurchList from "../components/Churches/ChurchList";
import { ChurchContext } from "../context/churchContext";
import { trashBin } from "ionicons/icons";

const ChurchFinder: React.FC = () => {
  const { searchChurches, churches, getAllChurches } = useContext(ChurchContext);

  // 'e' event object passed to the event handler is a change event targeting an input element
  // generic type paramenter 
  // onIonchange when user selects enter instead when query get update.
  // onChange when user change value in searchBar 
  // FormEventHandler object vs ChangeEvent object
  // changeEvent obj doesnt have EventTarget or HTMLInputElement

  const handleSearch = async (searchQuery: string) => {
    // Call function to search locations base on query
    await searchChurches(searchQuery)
  };

  const handleClear = async () => {
    await getAllChurches();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Church Finder</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar 
          onIonChange={(e) => handleSearch(e.detail.value!)}
          onIonClear={handleClear}
          clearIcon={trashBin} 
          ></IonSearchbar>
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
