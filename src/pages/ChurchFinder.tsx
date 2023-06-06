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

import { ChurchContext } from "../context/churchContext";
import ChurchList from "../components/Churches/ChurchList";
import { SearchChurchContext } from "../context/churchSearchContext";

const ChurchFinder: React.FC = () => {
  const { churches } = useContext(ChurchContext);
  const { searchResults, searchChurch } = useContext(SearchChurchContext);
  const [ searchQuery, setSearchQuery ] = useState('');



  useEffect(() => {
    searchChurch(searchQuery);
  }, [ searchChurch, searchQuery ]);
  // search operation when change in either
  // searchChurch function searchQuery value

  const handleSearch: FormEventHandler<HTMLIonSearchbarElement> = (e) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchQuery(value)
    searchChurch(value)
 
  }
// 'e' event object passed to the event handler is a change event targeting an input element
// generic type paramenter 
// onIonchange when user selects enter instead when query get update.
// onChange when user change value in searchBar 
// FormEventHandler object vs ChangeEvent object
  // changeEvent obj doesnt have EventTarget or HTMLInputElement


return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Church Finder</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar type='text' value={searchQuery} onChange={handleSearch}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <ChurchList churches={churches} />
              {/* <ChurchList churches={searchResults} /> */}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChurchFinder;
