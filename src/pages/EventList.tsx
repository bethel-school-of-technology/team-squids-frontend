import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";

const EventList = () => (
    <>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Event List</IonTitle>
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
                Event List
            </div>
        </IonContent>
    </>
);

export default EventList;