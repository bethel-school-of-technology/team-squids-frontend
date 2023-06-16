import React, { useContext } from "react";
import { IonIcon, IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';
import { Church } from "../../context/churchContext";
import { ChurchUserContext } from "../../context/churchUserContext";

interface ContainerProps {
  church: Church;
}

const ChurchItem: React.FC<ContainerProps> = ({
  church: {
    churchId,
    userId,
    churchName,
    denomination,
    location: { street, city, state, zip },
    phoneNumber,
    churchEmail,
    welcomeMessage,
    serviceTime,
    imageUrl,
    website,
  },
}) => {
  const { currentUserId } = useContext(ChurchUserContext);
  return (
    <IonItem
      routerLink={`/church/${churchId}`}
      button
      detail={userId !== currentUserId}
    >
      <IonThumbnail slot="start">
        <img alt="Church photo" src={imageUrl} />
      </IonThumbnail>
      <IonLabel>
        <h2>{churchName}</h2>
        {city && state && (
          <p>
            {city}, {state}
          </p>
        )}
      </IonLabel>
      {userId === currentUserId && (
          <IonIcon
            aria-hidden="true"
            color="primary"
            icon={createOutline}
          />
      )}
    </IonItem>
  );
};

export default ChurchItem;
