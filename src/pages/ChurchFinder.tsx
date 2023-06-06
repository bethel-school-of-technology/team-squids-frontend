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
import { ChurchLocationContext} from "../context/churchSearchContext";

const ChurchFinder: React.FC = () => {
  const searchContext = useContext(ChurchLocationContext);

  useEffect(() => {
    // calls function to get all locations 
    searchContext.getAllLocations;
  }, []);

  // const handleSearch: FormEventHandler<HTMLIonSearchbarElement> = (e) => {
  //   // Call function to search locations base on query
  //   const value = (e.target as HTMLInputElement).value;
  //   setSearchQuery(value)
  //   searchChurch(value)
 
  // }
// 'e' event object passed to the event handler is a change event targeting an input element
// generic type paramenter 
// onIonchange when user selects enter instead when query get update.
// onChange when user change value in searchBar 
// FormEventHandler object vs ChangeEvent object
  // changeEvent obj doesnt have EventTarget or HTMLInputElement

const handleSearch = async (searchQuery: string) => {
    // Call function to search locations base on query
    await searchContext.searchLocations(searchQuery)
  };

return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Church Finder</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar onIonChange={(e) => handleSearch(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              {/* <ChurchList churches={churches} /> */}
              <ChurchList churches={searchContext.locations}/>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChurchFinder;
