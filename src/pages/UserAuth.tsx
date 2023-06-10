import React, { useState } from "react";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonPage,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import AddUser from "./AddUser";
import LoginAccount from "./LoginAccount";
import styles from "../theme/forms.module.css";

const UserAuth: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<"create" | "login">(
    "create"
  );

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div className={styles.header}>
                <IonImg src="/svg/church_hive_icon.svg" className={styles.logo}/>
                <h1 className={styles.title}>Church<span className={styles.titleSpan}>Hive</span></h1>
              </div>
              <IonSegment
                value={selectedPage}
                onIonChange={(e) =>
                  setSelectedPage(e.detail.value as "create" | "login")
                }
                className={styles.segment}
              >
                <IonSegmentButton value="create">
                  <IonLabel>Create an Account</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="login">
                  <IonLabel>Login</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          {selectedPage === "create" && (
            <AddUser setSelectedPage={setSelectedPage} />
          )}
          {selectedPage === "login" && <LoginAccount />}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserAuth;
