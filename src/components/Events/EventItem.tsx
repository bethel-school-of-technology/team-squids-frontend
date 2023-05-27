import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { AllEvents } from "../../context/eventContext";

interface ContainerProps {
  event: AllEvents;
}

const EventItem: React.FC<ContainerProps> = ({ event }) => {
  const { eventId, eventTitle, eventDate, imageUrl, Church } = event;
  const {churchName } = Church;

  const isoDate = new Date(eventDate);
  const formatDate = Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  const formatDay = Intl.DateTimeFormat("en-us", {
    weekday: "long",
  });
  const formatTime = Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });
  const date = formatDate.format(isoDate);
  const day = formatDay.format(isoDate);
  const time = formatTime.format(isoDate);

  return (
    <IonItem routerLink={`/events/${eventId}`}>
      <IonThumbnail slot="start">
        <img alt={imageUrl} src={imageUrl} />
      </IonThumbnail>
      <IonLabel>
        <h2>{eventTitle}</h2>
        <p>{churchName}</p>
      </IonLabel>
      <IonLabel slot="end">
        <p>{day}</p>
        <h2>{date}</h2>
        <p>{time}</p>
      </IonLabel>
    </IonItem>
  );
};

export default EventItem;
