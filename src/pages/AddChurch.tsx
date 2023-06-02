import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React from 'react'
import PageHeader from '../components/Global/PageHeader';

const AddChurch: React.FC = () => {
  return (
    <IonPage>
      <PageHeader header="Add a Church"/>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
            <div>Add a Church</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default AddChurch