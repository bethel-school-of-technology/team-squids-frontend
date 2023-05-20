import {
  IonBackButton,
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
  IonToolbar,
} from "@ionic/react";
import { Church } from "../context/churchContext";
import { useParams } from "react-router";
import "./ChurchProfile.css";
import { Event } from "../context/eventContext";
import EventItem from "../components/EventFinder/EventItem";

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

let events: Event[] = [
  {
    eventId: 1,
 eventTitle: "Potluck Dinner",
 churchName: "First Church",
 eventDate: "5-18-23",
 eventTime: "6:30 PM",
 eventAddress: "123 First Street",
 eventType: "Family",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
  },
  {
    eventId: 2,
 eventTitle: "Gospel Concert",
 churchName: "Second Church",
 eventDate: "5-19-23",
 eventTime: "7:00 PM",
 eventAddress: "123 Second Street",
 eventType: "Family",
 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et."
  }
] 


const ChurchProfile: React.FC = () => {
  const params = useParams();

  //   let [church, setChurch] = useState<Church>();

  const renderEventList = () => {
    return events.map((event) => (
      <EventItem data={event} key={event.eventId} />
    ));
  };

  const handleConnectClick = () => {
    window.location.href = `mailto:${church.email}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{church.churchName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonImg
                className="hero-img"
                src={church.imageURL}
                alt={church.churchName}
              />
            </IonCol>
            <IonCol size="12">
              <h1>{church.churchName}</h1>
              <IonText color="primary">
                <h6>{church.denomination}</h6>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Service Times</h4>
              <IonText color="medium">
                <p>{church.servicesTimes}</p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Location</h4>
              <IonText color="medium">
                <p>
                  {church.address} <br />
                  {church.city}, {church.state} {church.zip}
                </p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Contact Information</h4>
              <a href={`https://${church.website}`}>
                <p>{church.website}</p>
              </a>
              <IonText color="medium">
                <p>{church.phone}</p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Welcome to {church.churchName}</h4>
              <IonText color="medium">
                <p>{church.welcomeMessage}</p>
              </IonText>
            </IonCol>
            <IonCol size="12">
              <h4>Upcoming Events</h4>
              <div className="event-list">{renderEventList()}</div>
              
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block" onClick={handleConnectClick}>Connect wih Us</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChurchProfile;
