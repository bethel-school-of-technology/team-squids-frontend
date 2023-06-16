import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/react";
import LoginAccount from "./LoginAccount";
import styles from "../theme/forms.module.css";

const UserAuth: React.FC = () => {

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
