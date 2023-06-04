import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetchEvent } from "../hooks/useFetchEvent";
import LoadingSpinner from "../components/Global/LoadingSpinner";
import EventInfo from "../components/Events/EventInfo";
import ErrorAlert from "../components/Global/ErrorAlert";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
} from "@ionic/react";
import { EventContext } from "../context/eventContext";
import { ChurchUserContext } from "../context/churchUserContext";
import PageHeader from "../components/Global/PageHeader";

interface EventRouteParams {
  eventId: string;
}

const EventDetails: React.FC = () => {
  const params = useParams<EventRouteParams>();
  const history = useHistory();
  const { deleteEvent } = useContext(EventContext);
  const { currentUserId } = useContext(ChurchUserContext);
  const { event, loadingStatus, error } = useFetchEvent(
    parseInt(params.eventId)
  );

  async function handleDeleteEvent(eventId: number) {
    try {
      await deleteEvent(eventId);
      history.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <IonPage>
      <ErrorAlert error={error} />
      {/* {loadingStatus && <LoadingSpinner status={true} />} */}
      <PageHeader header={event ? event?.eventTitle : "No Event"} />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>{event && <EventInfo data={event} />}</IonRow>
          <IonRow>
            {event && event.Church.churchEmail && (
              <IonCol size="12">
                <IonButton
                  expand="block"
                  onClick={() => {
                    const emailLink = `mailto:${event.Church.churchEmail}`;
                    window.location.href = emailLink;
                  }}
                >
                  Connect with Us
                </IonButton>
              </IonCol>
            )}
            {event && event.Church.userId === currentUserId && (
              <IonCol size="12">
                <IonButton
                  id="editEvent"
                  color="secondary"
                  fill="outline"
                  expand="block"
                  routerLink={`/events/edit/${event.eventId}`}
                >
                  Edit Event
                </IonButton>
              </IonCol>
            )}
            {event && event.Church.userId === currentUserId && (
              <IonCol size="12">
                <IonButton
                  id="deleteEvent"
                  color="danger"
                  fill="outline"
                  expand="block"
                  onClick={() => handleDeleteEvent(event.eventId)}
                >
                  Delete Event
                </IonButton>
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EventDetails;
