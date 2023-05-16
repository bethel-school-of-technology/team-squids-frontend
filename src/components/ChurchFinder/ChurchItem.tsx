import { IonAvatar, IonItem, IonLabel, IonThumbnail } from "@ionic/react";

import { Church } from "../../context/churchContext";

interface ContainerProps {
  data: Church;
}

const ChurchItem: React.FC<ContainerProps> = ({ data }) => {
  return (
    <IonItem href="#">
      <IonThumbnail slot="start">
        <img alt="Silhouette of a person's head" src={data.imageURL} />
      </IonThumbnail>
      <IonLabel>
        <h2>{data.churchName}</h2>
        <p>{data.address}</p>
      </IonLabel>
      <IonLabel slot="end">
        <h4>00.0 miles</h4>
      </IonLabel>
    </IonItem>
  );
};

export default ChurchItem;
