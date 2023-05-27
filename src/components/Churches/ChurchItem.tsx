import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { Church } from "../../context/churchContext";

interface ContainerProps {
  church: Church;
}

const ChurchItem: React.FC<ContainerProps> = ({ church }) => {
  const {
    churchId,
    userId,
    churchName,
    denomination,
    location,
    phoneNumber,
    churchEmail,
    welcomeMessage,
    serviceTime,
    imageUrl,
    website,
  } = church;

  const { street, city, state, zip } = location;

  return (
    <IonItem routerLink={`/churches/${churchId}`}>
      <IonThumbnail slot="start">
        <img alt="Silhouette of a person's head" src={imageUrl} />
      </IonThumbnail>
      <IonLabel>
        <h2>{churchName}</h2>
        <p>
          {street}, {city}, {state}, {zip}
        </p>
      </IonLabel>
      <IonLabel slot="end">
        <h4>00.0 miles</h4>
      </IonLabel>
    </IonItem>
  );
};

export default ChurchItem;
