import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ChurchItem from "../components/ChurchFinder/ChurchItem";
import { Church } from "../context/churchContext";

let churches: Church[] = [
  {
    churchId: 1,
    churchName: "First Church",
    denomination: "Baptist",
    address: "123 First Street",
    phone: "555-555-555",
    email: "connect@firstchurch.com",
    servicesTimes: "Sundays 8:00 am, 10:30 am 12:00 pm",
    contactName: "Joe Pastor",
    website: "www.firstchurch.com",
    welcomeMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis enim ut tellus elementum. Tellus integer feugiat scelerisque varius morbi enim nunc. Facilisis gravida neque convallis a cras semper auctor neque vitae. Sit amet nisl purus in mollis nunc sed. Ac tortor vitae purus faucibus. In hendrerit gravida rutrum quisque non tellus. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Fusce ut placerat orci nulla pellentesque dignissim. Mauris augue neque gravida in fermentum et sollicitudin. ",
    imageURL: "https://ionicframework.com/docs/img/demos/avatar.svg",
  },
  {
    churchId: 2,
    churchName: "Second Church",
    denomination: "Methodist",
    address: "123 Second Street",
    phone: "555-555-555",
    email: "connect@secondchurch.com",
    servicesTimes: "Sundays 8:00 am, 10:30 am 12:00 pm",
    contactName: "Joe Pastor",
    website: "www.secondtchurch.com",
    welcomeMessage:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis enim ut tellus elementum. Tellus integer feugiat scelerisque varius morbi enim nunc. Facilisis gravida neque convallis a cras semper auctor neque vitae. Sit amet nisl purus in mollis nunc sed. Ac tortor vitae purus faucibus. In hendrerit gravida rutrum quisque non tellus. Convallis a cras semper auctor neque vitae tempus quam pellentesque. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Fusce ut placerat orci nulla pellentesque dignissim. Mauris augue neque gravida in fermentum et sollicitudin. ",
    imageURL: "https://ionicframework.com/docs/img/demos/avatar.svg",
  },
];

const ChurchFinder: React.FC = () => {
  const renderChurchList = () => {
    return churches.map((church) => (
      <ChurchItem data={church} key={church.churchId} />
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Church Finder</IonTitle>
        </IonToolbar>
        <IonToolbar color="primary">
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {renderChurchList()}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChurchFinder;
