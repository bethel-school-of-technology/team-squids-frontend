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

import React from "react";
import { useParams } from "react-router-dom";
import { useFetchEvent } from "../hooks/useFetchEvent";
import LoadingSpinner from "../components/Global/LoadingSpinner";
import EventInfo from "../components/Events/EventInfo";
import ErrorAlert from "../components/Global/ErrorAlert";


interface EventRouteParams {
  eventId: string;
}

const EventDetails: React.FC = () => {
  const params = useParams<EventRouteParams>();
  const { event, loadingStatus, error } = useFetchEvent(
    parseInt(params.eventId)
  );

  return (
    <>
      <ErrorAlert error={error} />
      <LoadingSpinner status={loadingStatus} />
      {event && <EventInfo data={event} />}
    </>
  );
};

export default EventDetails;