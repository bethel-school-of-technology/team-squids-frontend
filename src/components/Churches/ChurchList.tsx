import React, { FC, useContext } from "react";
import { IonList } from "@ionic/react";
import { AllChurches, ChurchContext } from "../../context/churchContext";
import ChurchItem from "./ChurchItem";
import { ChurchLocationContext } from "../../context/churchSearchContext";

interface ChurchListProps {
  churches: AllChurches[];
}

const ChurchList: FC<ChurchListProps> = () => {
const churchContext = useContext(ChurchContext);
const locationContext = useContext(ChurchLocationContext);
const { searchQuery } = locationContext; 
const { churches } = churchContext;


const filteredChurches = churches.filter((church) =>
  [church.location.street, church.location.city, church.location.state, church.location.zip]
    .some((property) => property.toLowerCase().includes(searchQuery.toLowerCase()))
);
  return (
    <IonList>
      {churches.map((church) => (
        <ChurchItem church={church} key={church.churchId} />
      
      ))}
    </IonList>
  );
};

export default ChurchList;
