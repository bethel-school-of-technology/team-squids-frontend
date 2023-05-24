// // import {
// //   IonBackButton,
// //   IonButton,
// //   IonButtons,
// //   IonCol,
// //   IonContent,
// //   IonGrid,
// //   IonHeader,
// //   IonImg,
// //   IonPage,
// //   IonRow,
// //   IonText,
// //   IonTitle,
// //   IonToolbar,
// // } from "@ionic/react";

// // import { Event, EventContext } from "../context/eventContext";
// // import { useParams } from "react-router";
// // import { Church } from "../context/churchContext";

// // const EventDetail: React.FC = () => {
// //   const params = useParams();

// //   const handleContactClick = () => {
// //     window.location.href = `mailto:${church.email}`;
// //   };

// //   return (
// //     <IonPage>
// //       <IonHeader>
// //         <IonToolbar>
// //           <IonButtons slot="start">
// //             <IonBackButton></IonBackButton>
// //           </IonButtons>
// //           {/* <IonHeader>{church.churchName}</IonHeader> */}
// //           <IonTitle>{event.eventTitle}</IonTitle>
// //         </IonToolbar>
// //       </IonHeader>
// //       <IonContent fullscreen>
// //         <IonGrid>
// //           <IonRow>
// //             <IonCol size="12">
// //               <IonImg />
// //             </IonCol>
// //             <IonCol size="12">
// //               <IonText color="medium">
// //                 <h3>{church.churchName}</h3>
// //                 <h1>{event.eventTitle}</h1>
// //               </IonText>
// //             </IonCol>
// //             <IonCol>
// //               <IonText color="danger">
// //                 <h3>
// //                   {event.eventDay}, {event.eventDate}
// //                 </h3>
// //                 <h3>{event.eventTime}</h3>
// //               </IonText>
// //             </IonCol>
// //             <IonCol size="12">
// //               <IonText>
// //                 <p>
// //                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
// //                   do eiusmod tempor incididunt ut labore et dolore magna aliqua.
// //                   Mattis enim ut tellus elementum. Tellus integer feugiat
// //                   scelerisque varius morbi enim nunc. Facilisis gravida neque
// //                   convallis a cras semper auctor neque vitae. Sit amet nisl
// //                   purus in mollis nunc sed. Ac tortor vitae purus faucibus. In
// //                   hendrerit gravida rutrum quisque non tellus. Convallis a cras
// //                   semper auctor neque vitae tempus quam pellentesque. Fermentum
// //                   odio eu feugiat pretium nibh ipsum consequat nisl. Lobortis
// //                   elementum nibh tellus molestie nunc non blandit massa enim.
// //                   Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
// //                   fermentum odio. Sed ullamcorper morbi tincidunt ornare massa
// //                   eget egestas purus viverra. Fusce ut placerat orci nulla
// //                   pellentesque dignissim. Mauris augue neque gravida in
// //                   fermentum et sollicitudin.
// //                 </p>
// //               </IonText>
// //             </IonCol>
// //             <IonCol size="12">
// //               <IonButton expand="block" onClick={handleContactClick}>
// //                 Contact Us
// //               </IonButton>
// //             </IonCol>
// //           </IonRow>
// //         </IonGrid>
// //       </IonContent>
// //     </IonPage>
// //   );
// // };

// // export default EventDetail;

import React, { useContext, useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Church, ChurchContext } from "../context/churchContext";
import { useParams } from "react-router-dom";
import "./ChurchProfile.css";
import EventItem from "../components/Events/EventItem";
import { Event, EventContext } from "../context/eventContext";

interface EventRouteParams {
  eventId: string;
}

const EventDetails: React.FC = () => {
  const params = useParams<EventRouteParams>();
  const { events, getEvent } = useContext(EventContext);
  const { getChurch } = useContext(ChurchContext);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [selectedChurch, setSelectedChurch] = useState<Church | undefined>();
  const [error, setError] = useState<string | undefined>(undefined);

  

  const isoDate = selectedEvent ? new Date(selectedEvent.eventDate) : null;
  const formatDate = Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  });
  const formatDay = Intl.DateTimeFormat("en-us", {
    weekday: "long",
  });
  const formatTime = Intl.DateTimeFormat("en-us", {
    timeStyle: "short",
  });
  const date = isoDate ? formatDate.format(isoDate) : "";
  const day = isoDate ? formatDay.format(isoDate) : "";
  const time = isoDate ? formatTime.format(isoDate) : "";

  const loading = () => {
    return <IonLoading isOpen={true} />;
  };

  const churchEvents = events.filter(
    (event) =>
      event.churchId === selectedChurch?.churchId &&
      event.eventId != selectedEvent?.eventId
  );
  const renderEventList = () => {
    return churchEvents.map((e) => <EventItem data={e} key={e.eventId} />);
  };

  const upcomingEvents = () => {
    if (churchEvents.length === 0) return;
    return (
      <IonCol size="12">
        <h4>Other Events</h4>
        <div className="event-list">{renderEventList()}</div>
      </IonCol>
    );
  };
  const handleConnectClick = () => {
    window.location.href = `mailto:${selectedChurch?.churchEmail}`;
  };

  const eventInfo = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>{selectedEvent?.eventTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <IonImg
                  className="hero-img"
                  src={selectedEvent?.imageUrl}
                  alt={selectedEvent?.eventTitle}
                />
              </IonCol>
              <IonCol size="12">
                <h1>{selectedEvent?.eventTitle}</h1>
                <IonText color="primary">
                  <h6>{selectedChurch?.churchName}</h6>
                </IonText>
              </IonCol>
              <IonCol size="12">
                  <IonText color="primary">

                  <h6>{day}</h6>
                </IonText>
                <h4>{date}</h4>
                <IonText color="medium">
                  <p>{time}</p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Location</h4>
                <IonText color="medium">
                  <p>
                    {selectedEvent?.eventStreet} <br />
                    {selectedEvent?.eventCity}, {selectedEvent?.eventState}{" "}
                    {selectedEvent?.eventZip}
                  </p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <IonText color="medium">
                  <p>{selectedEvent?.description}</p>
                </IonText>
              </IonCol>
              <IonCol size="12">
                <h4>Contact Information</h4>
                <a href={`https://www.${selectedChurch?.website}`}>
                  <p>{selectedChurch?.churchEmail}</p>
                </a>
                <IonText color="medium">
                  <p>{selectedChurch?.phoneNumber}</p>
                </IonText>
              </IonCol>
              {upcomingEvents()}
              <IonCol>
                <IonButton expand="block" onClick={handleConnectClick}>
                  Connect with Us
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };

  return !selectedEvent || selectedEvent.churchId !== parseInt(params.eventId)
    ? loading()
    : eventInfo();
};

export default EventDetails;
