import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const Profile = () => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonTitle> Profile </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
        <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Profile
        </div>
        </IonContent>
        </>

);

export default Profile;
