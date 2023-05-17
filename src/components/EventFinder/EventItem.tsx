import { IonAvatar, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { Event } from "../../context/eventContext"
import { calendar } from "ionicons/icons";

interface ContainerProps {
  data: Event;
}



const EventItem: React.FC<ContainerProps> = ({ data }) => {
  return (
    <IonItem href="#">
      <IonThumbnail slot="start">
        <IonIcon icon={calendar} />
      </IonThumbnail>
      <IonLabel>
        <h2>{data.eventTitle}</h2>
        <p>{data.churchName}</p>
      </IonLabel>
      <IonLabel slot="end">
        <p>{data.eventTime}</p>
        <h2>{data.eventDate}</h2>
      </IonLabel>
    </IonItem>
  );
};

export default EventItem;
