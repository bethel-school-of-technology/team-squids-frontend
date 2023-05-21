import { IonAvatar, IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { Event } from "../../context/eventContext"
import { calendar } from "ionicons/icons";

interface ContainerProps {
  data: Event;
}



const EventItem: React.FC<ContainerProps> = ({ data }) => {
  return (
    <IonItem routerLink={`events/${data.eventId}`}>
      <IonThumbnail slot="start">
        <IonIcon icon={calendar} />
        {/* <IonThumbnail slot="start">
        <img alt="Silhouette of a person's head" src={data.imageURL} />
      </IonThumbnail> Something more like this. */}
      </IonThumbnail>
      <IonLabel>
        <h2>{data.eventTitle}</h2>
        <p>{data.churchName}</p>
      </IonLabel>
      <IonLabel slot="end">
      <p>{data.eventDay}</p>
      <h2>{data.eventDate}</h2>
        <p>{data.eventTime}</p>
      </IonLabel>
    </IonItem>
  );
};

export default EventItem;
