import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { AllEvents } from "../../context/eventContext";

interface ContainerProps {
  event: AllEvents;
}

const EventItem: React.FC<ContainerProps> = ({ event }) => {
  const { eventId, eventTitle, date, imageUrl, Church } = event;
  const {churchName } = Church;

  const isoDate = new Date(date);
  const formatDate = Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  const formatDay = Intl.DateTimeFormat("en-us", {
    weekday: "long",
  });
  const formatTime = Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });
  const eventDate = formatDate.format(isoDate);
  const eventDay = formatDay.format(isoDate);
  const eventTime = formatTime.format(isoDate);

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
        <p>{eventDay}</p>
        <h2>{eventDate}</h2>
        <p>{eventTime}</p>
      </IonLabel>
    </IonItem>
  );
};

export default EventItem;
