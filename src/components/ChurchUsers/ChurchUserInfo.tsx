import React from "react";
import { IonCol, IonIcon, IonItem, IonLabel, IonRouterLink, IonText } from "@ionic/react";
import { OneChurchUser } from "../../context/churchUserContext";
import { createOutline } from "ionicons/icons";
import "./ChurchUserInfo.css";

interface ContainerProps {
  data: OneChurchUser;
}

const ChurchUserInfo: React.FC<ContainerProps> = ({
  data: { userId, email, password, firstName, lastName },
}) => {
  return (
    <IonCol size="12">
      <h4>User Information</h4>
      <IonRouterLink routerLink={`/user/edit/${userId}`}>
      <IonItem>
        <IonLabel>
          <h2>First Name</h2>
          <IonText color="medium">
            <p>{firstName}</p>
          </IonText>
        </IonLabel>
        <IonIcon
          aria-hidden="true"
          color="primary"
          icon={createOutline}
          slot="end"
        />
      </IonItem>
      <IonItem>
        <IonLabel>
          <h2>Last Name</h2>
          <IonText color="medium">
            <p>{lastName}</p>
          </IonText>
        </IonLabel>
        <IonIcon
          aria-hidden="true"
          color="primary"
          icon={createOutline}
          slot="end"
        />
      </IonItem>
      <IonItem>
        <IonLabel>
          <h2>Email</h2>
          <IonText color="medium">
            <p>{email}</p>
          </IonText>
        </IonLabel>
        <IonIcon
          aria-hidden="true"
          color="primary"
          icon={createOutline}
          slot="end"
        />
      </IonItem>
      <IonItem className="list-item">
        <IonLabel>
          <h2>Password</h2>
          <IonText color="medium">
            <input type="password" value={password.slice(0, 12)} readOnly />
          </IonText>
        </IonLabel>
        <IonIcon
          aria-hidden="true"
          color="primary"
          icon={createOutline}
          slot="end"
        />
      </IonItem>
      </IonRouterLink>
    </IonCol>
  );
};

export default ChurchUserInfo;
