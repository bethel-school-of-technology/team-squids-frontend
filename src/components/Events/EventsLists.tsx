import React from "react";
import { IonList } from "@ionic/react";
import EventItem from "./EventItem";
import { Event } from "../../context/eventContext";

interface EventListProps {
  data: Event[];
  churchName: string;
}

const EventList: React.FC<EventListProps> = ({ data, churchName }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <IonList>
      {data.map((event) => (
        <EventItem data={event} churchName={churchName} key={event.eventId} />
      ))}
    </IonList>
  );
};

export default EventList;
