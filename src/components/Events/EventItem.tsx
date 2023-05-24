import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { Event } from "../../context/eventContext";

interface ContainerProps {
  data: Event;
  churchName: string;
}

const EventItem: React.FC<ContainerProps> = ({ data, churchName }) => {
  const {
    eventId,
    churchId,
    eventTitle,
    eventDate,
    eventStreet,
    eventCity,
    eventState,
    eventZip,
    eventType,
    description,
    imageUrl,
    createdAt,
    updatedAt,
  } = data;

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
