import { IonBackButton, 
    IonButton, 
    IonButtons, 
    IonCol, 
    IonContent,  
    IonGrid,  
    IonHeader,  
    IonImg,  
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";

import EventList from "./EventList";
import { Event } from "../context/eventContext";
import { useParams } from "react-router";
import EventItem from "../components/EventFinder/EventItem";
import { Church } from "../context/churchContext";


const EventDetail: React.FC = () => {
    const params = useParams();

  

let event: Event = 
    {
        eventId: 1,
 eventTitle: "Potluck Dinner",
 churchName: "First Church",
 eventDay: "Thursday",
 eventDate: "5-18-23",
 eventTime: "6:30 PM",
 eventAddress: "123 First Street",
 eventType: "Family",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"

    }


let church: Church = {
  churchId: 1,
  churchName: "First Church",
  denomination: "Baptist",
  address: "123 First Street",
  city: "Anytown",
  state: "CK",
  zip: "12345",
  phone: "555-555-555",
  email: "connect@firstchurch.com",
  servicesTimes: "Sundays 8:00 am, 10:30 am 12:00 pm",
  contactName: "Joe Pastor",
  website: "www.firstchurch.com",
  welcomeMessage:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis enim ut tellus elementum. Tellus integer feugiat scelerisque varius morbi enim nunc. Facilisis gravida neque convallis a cras semper auctor neque vitae. Sit amet nisl purus in mollis nunc sed. Ac tortor vitae purus faucibus. In hendrerit gravida rutrum quisque non tellus. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Fusce ut placerat orci nulla pellentesque dignissim. Mauris augue neque gravida in fermentum et sollicitudin. ",
  imageURL:
    "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
};
    // const renderEventDetail = () => {
    //     return event.map((event) => (
    //         <EventItem data={event} key={event.eventId} />
    //     ));
    // };

    const handleContactClick = () => {
        window.location.href = `mailto:${church.email}`;
    };

return(
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                {/* <IonHeader>{church.churchName}</IonHeader> */}
                <IonTitle>{event.eventTitle}</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <IonImg />

                    </IonCol>
                    <IonCol size="12">
                    <IonText color="medium">
                        <h3>{church.churchName}</h3>
                        <h1>{event.eventTitle}</h1>
                        </IonText>    
                    </IonCol>
                    <IonCol>
                        <IonText color="danger">
                            <h3>{event.eventDay}, {event.eventDate}</h3>
                            <h3>{event.eventTime}</h3>
                        </IonText>
                    </IonCol>
                    <IonCol size="12">
                        <IonText>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna 
                                aliqua. Mattis enim ut tellus elementum. Tellus integer 
                                feugiat scelerisque varius morbi enim nunc. Facilisis 
                                gravida neque convallis a cras semper auctor neque vitae. 
                                Sit amet nisl purus in mollis nunc sed. Ac tortor vitae 
                                purus faucibus. In hendrerit gravida rutrum quisque non 
                                tellus. Convallis a cras semper auctor neque vitae tempus 
                                quam pellentesque. Fermentum odio eu feugiat pretium nibh 
                                ipsum consequat nisl. Lobortis elementum nibh tellus molestie 
                                nunc non blandit massa enim. Pellentesque eu tincidunt tortor 
                                aliquam nulla facilisi cras fermentum odio. Sed ullamcorper 
                                morbi tincidunt ornare massa eget egestas purus viverra. 
                                Fusce ut placerat orci nulla pellentesque dignissim. 
                                Mauris augue neque gravida in fermentum et sollicitudin.</p>
                        </IonText>
                    </IonCol>
                    <IonCol size="12">
                        <IonButton expand="block" onClick={handleContactClick}>Contact Us</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
);
};

export default EventDetail;
