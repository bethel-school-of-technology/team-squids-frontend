import React, { useContext } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Church, ChurchContext } from "../context/churchContext";
import { useParams } from "react-router-dom";
import "./ChurchProfile.css";
import EventItem from "../components/Events/EventItem";
import { Event, EventContext } from "../context/eventContext";
import { useFetchChurch } from "../hooks/useFetchChurch";
import EventList from "../components/Events/EventsLists";
import LoadingSpinner from "../components/Global/LoadingSpinner";
import ChurchInfo from "../components/Churchs/ChurchInfo";

interface ChurchRouteParams {
  churchId: string;
}

const ChurchProfile: React.FC = () => {
  const params = useParams<ChurchRouteParams>();
  const { church, loadingStatus, error } = useFetchChurch(
    parseInt(params.churchId)
  );

  return (
    <>
      {/* <LoadingSpinner data={loadingStatus} /> */}
      {church && <ChurchInfo data={church} />}
    </>
  );
};

export default ChurchProfile;
