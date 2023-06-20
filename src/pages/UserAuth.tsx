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
              <center>
                <p className={styles.loginTitle}>Login</p>
              </center>
            </IonCol>
          </IonRow>
          <LoginAccount/>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserAuth;
