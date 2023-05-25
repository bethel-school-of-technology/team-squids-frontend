import React from "react";
import { IonLabel, IonList } from "@ionic/react";
import { Church } from "../../context/churchContext";
import ChurchItem from "./ChurchItem";
import LoadingSpinner from "../Global/LoadingSpinner";

interface ChurchListProps {
  data: Church[];
}

const ChurchList: React.FC<ChurchListProps> = ({ data }) => {
  if (data.length === 0) {
    return <LoadingSpinner status={true} />;
  }

  return (
    <>
    <LoadingSpinner status={false} />
    <IonList>
      {data.map((church) => (
        <ChurchItem data={church} key={church.churchId} />
      ))}
    </IonList>
    </>
  );
};

export default ChurchList;
