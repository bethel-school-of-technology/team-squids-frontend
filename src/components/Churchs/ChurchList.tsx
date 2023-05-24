import React from "react";
import { IonLabel, IonList } from "@ionic/react";
import { Church } from "../../context/churchContext";
import ChurchItem from "./ChurchItem";

interface ChurchListProps {
  data: Church[];
}

const ChurchList: React.FC<ChurchListProps> = ({ data }) => {
  if (data.length === 0) {
    return <IonLabel>No churches available</IonLabel>;
  }

  return (
    <IonList>
      {data.map((church) => (
        <ChurchItem data={church} key={church.churchId} />
      ))}
    </IonList>
  );
};

export default ChurchList;
