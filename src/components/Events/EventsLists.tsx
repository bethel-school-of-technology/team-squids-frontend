import React from "react";
import { IonList } from "@ionic/react";
import EventItem from "./EventItem";
import { Event } from "../../context/eventContext";
import LoadingSpinner from "../Global/LoadingSpinner";

interface EventListProps {
  data: Event[];
  churchName: string;
}

const EventsList: React.FC<EventListProps> = ({ data, churchName }) => {
  if (data.length === 0) {
    return <LoadingSpinner status={true} />;
  }

  return (
    <>
      <LoadingSpinner status={false} />
      <IonList>
        {data.map((event) => (
          <EventItem data={event} churchName={churchName} key={event.eventId} />
        ))}
      </IonList>
    </>
  );
};

export default EventsList;
