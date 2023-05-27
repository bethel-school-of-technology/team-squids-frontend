import React from "react";
import { IonLabel, IonList } from "@ionic/react";
import { Church } from "../../context/churchContext";
import ChurchItem from "./ChurchItem";
import LoadingSpinner from "../Global/LoadingSpinner";

interface ChurchListProps {
  churches: Church[];
}

const ChurchList: React.FC<ChurchListProps> = ({ churches }) => {
  if (churches.length === 0) {
    return <LoadingSpinner status={true} />;
  }

  return (
    <>
    <LoadingSpinner status={false} />
    <IonList>
      {churches.map((church) => (
        <ChurchItem church={church} key={church.churchId} />
      ))}
    </IonList>
    </>
  );
};

export default ChurchList;
