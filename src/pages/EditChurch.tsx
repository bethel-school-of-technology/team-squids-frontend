import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React from 'react'
import PageHeader from '../components/Global/PageHeader';

const EditChurch: React.FC = () => {
  return (
    <IonPage>
      <PageHeader header={`Edit Church`}/>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
            <div>Edit Church</div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default EditChurch