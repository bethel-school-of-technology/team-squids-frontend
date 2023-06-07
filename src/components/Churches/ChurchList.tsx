import React, { FC, useContext } from "react";
import { IonList } from "@ionic/react";
import { AllChurches } from "../../context/churchContext";
import ChurchItem from "./ChurchItem";

interface ChurchListProps {
  churches: AllChurches[];
}

const ChurchList: FC<ChurchListProps> = ( { churches } ) => {

  return (
    <IonList>
      {churches.map((church) => (
        
        <ChurchItem church={church} key={church.churchId} />
      
      ))}
    </IonList>
  );
};

export default ChurchList;
