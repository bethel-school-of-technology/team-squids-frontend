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
// ...
import "./UserAuth.css";

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
              <div className="header-container">
                <IonImg src="/svg/church_hive_icon.svg" />
                <h1>Church Hive</h1>
              </div>
              <IonSegment
                value={selectedPage}
                onIonChange={(e) =>
                  setSelectedPage(e.detail.value as "create" | "login")
                }
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
