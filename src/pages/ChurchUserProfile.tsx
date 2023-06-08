import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/Global/LoadingSpinner";
import ErrorAlert from "../components/Global/ErrorAlert";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import "./ChurchProfile.css";
import PageHeader from "../components/Global/PageHeader";
import ChurchList from "../components/Churches/ChurchList";
import ChurchUserInfo from "../components/ChurchUsers/ChurchUserInfo";
import EventsList from "../components/Events/EventsLists";
import { useFetchChurchUser } from "../hooks/useFetchChurchUser";
import "./ChurchUserProfile.css";
import { EventContext } from "../context/eventContext";

interface ChurchUserRouteParams {
  userId: string;
}

const UserProfile: React.FC = () => {
  const params = useParams<ChurchUserRouteParams>();
  const { churchUser, loadingStatus, error } = useFetchChurchUser(
    parseInt(params.userId)
  );
  const { userEvents } = useContext(EventContext);


  return (
    <IonPage>
      <ErrorAlert error={error} />
      <LoadingSpinner status={loadingStatus} />
      <PageHeader header={churchUser ? "User Profile" : "No User"} />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            {churchUser && <ChurchUserInfo data={churchUser} />}
            <IonCol size="12">
              <div className="add">
                <h4>My Churches</h4>
                <IonRouterLink routerLink="/add-church" slot="end">
                  Add
                </IonRouterLink>
              </div>
              {churchUser && churchUser?.Churches.length > 0 && (
                <ChurchList churches={churchUser.Churches} />
              )}
            </IonCol>
            <IonCol size="12">
              <div className="add">
                <h4>My Events</h4>
                <IonRouterLink routerLink="/add-event" slot="end">
                  Add
                </IonRouterLink>
              </div>
              {userEvents.length > 0 && (
                <EventsList events={userEvents} />
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
