import React, { useContext, useState } from "react";
import { IonInput, IonButton, IonRow, IonCol } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { ChurchUserContext, NewChurchUser } from "../context/churchUserContext";
import "./AddUser.css"

interface AddUserProps {
  setSelectedPage: React.Dispatch<React.SetStateAction<"create" | "login">>;
}

const AddUser: React.FC<AddUserProps> = ({ setSelectedPage }) => {
  const { createChurchUser } = useContext(ChurchUserContext);
  const [newUser, setNewUser] = useState<NewChurchUser>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const history = useHistory();

  const handleInputChange = (name: string, value: string | number) => {
    setNewUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleInputBlur = (name: string) => {
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name]);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const isCreateSuccessful = await createChurchUser(newUser);
    if (isCreateSuccessful) {
      console.log("User created successfully");
      setSelectedPage("login");
    } else {
      console.log("User creation failed");
    }
  };

  const isFieldTouched = (name: string) => {
    return touchedFields.includes(name);
  };

  return (
    <IonRow>
      <IonCol size="12">
        <IonInput
          className={`ion-input-field ${
            isFieldTouched("firstname") ? "" : "ion-untouched"
          }`}
          required
          type="text"
          label="First Name"
          labelPlacement="floating"
          value={newUser.firstName}
          onIonInput={(e) => handleInputChange("firstName", e.detail.value!)}
          onBlur={() => handleInputBlur("firstName")}
        />
      </IonCol>
      <IonCol size="12">
        <IonInput
          className={`ion-input-field ${
            isFieldTouched("Last Name") ? "" : "ion-untouched"
          }`}
          required
          type="text"
          label="Last Name"
          labelPlacement="floating"
          value={newUser.lastName}
          onIonInput={(e) => handleInputChange("lastName", e.detail.value!)}
          onBlur={() => handleInputBlur("lastName")}
        />
      </IonCol>
      <IonCol size="12">
        <IonInput
          className={`ion-input-field ${
            isFieldTouched("email") ? "" : "ion-untouched"
          }`}
          required
          type="email"
          label="Email Address"
          labelPlacement="floating"
          value={newUser.email}
          onIonInput={(e) => handleInputChange("email", e.detail.value!)}
          onBlur={() => handleInputBlur("email")}
        />
      </IonCol>
      <IonCol size="12">
        <IonInput
          className={`ion-input-field ${
            isFieldTouched("password") ? "" : "ion-untouched"
          }`}
          required
          type="password"
          label="Password"
          labelPlacement="floating"
          value={newUser.password}
          onIonInput={(e) => handleInputChange("password", e.detail.value!)}
          onBlur={() => handleInputBlur("password")}
        />
      </IonCol>
      <IonCol size="12">
        <IonButton expand="full" onClick={handleSubmit}>
          Submit
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default AddUser;
