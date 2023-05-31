import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { OneChurchUser } from "../../context/churchUserContext";
import { createOutline } from "ionicons/icons";
import ChurchList from "../Churches/ChurchList";

interface ContainerProps {
  data: OneChurchUser;
}

const ChurchUserInfo: React.FC<ContainerProps> = ({ data }) => {
  const { userId, email, password, Churches } = data;

  console.log(data);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>User Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <h4>User Information</h4>
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
              <IonItem>
                <IonLabel>
                  <h2>Password</h2>
                  <IonText color="medium">
                    <p>{password}</p>
                  </IonText>
                </IonLabel>
                <IonIcon
                  aria-hidden="true"
                  color="primary"
                  icon={createOutline}
                  slot="end"
                />
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <h4>Your Churches</h4>
              <ChurchList churches={Churches} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ChurchUserInfo;
