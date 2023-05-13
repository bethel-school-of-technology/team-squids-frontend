import React from "react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const ChurchList = () => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Church List</IonTitle>
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
                Church List Content
            </div>
        </IonContent>
    </>
);

export default ChurchList;