import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React from 'react'
import PageHeader from '../components/Global/PageHeader';

const EditEvent: React.FC = () => {
  return (
    <IonPage>
      <PageHeader header={`Edit Church`}/>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
            <div>Edit Event</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default EditEvent;