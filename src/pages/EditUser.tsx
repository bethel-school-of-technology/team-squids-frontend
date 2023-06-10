import React, { useContext, useEffect, useState } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonInput,
  IonButton,
  IonImg,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import PageHeader from "../components/Global/PageHeader";
import { ChurchUser, ChurchUserContext } from "../context/churchUserContext";
import styles from "../theme/forms.module.css";

interface EditUserParams {
  userId: string;
}

const EditUser: React.FC = () => {
  const params = useParams<EditUserParams>();
  const { getChurchUser, updateChurchUser } = useContext(ChurchUserContext);
  const [updatedUser, setUpdatedUser] = useState<ChurchUser>({
    userId: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    (async () => {
      const currentUser = await getChurchUser(parseInt(params.userId));
      setUpdatedUser((prevUser) => ({
        ...prevUser,
        ...currentUser,
        password: ""
      }));
    })();
  }, []);
  

  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const history = useHistory();

  const handleInputChange = (name: string, value: string | number) => {
    setUpdatedUser((prevChurch) => ({
      ...prevChurch,
      [name]: typeof value === "string" ? (value as string).trim() : value,
    }));
  };

  const handleInputBlur = (name: string) => {
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name]);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await updateChurchUser(updatedUser);
    await getChurchUser(updatedUser.userId);
    history.push(`/user/${updatedUser.userId}`);
  };

  const isFieldTouched = (name: string) => {
    return touchedFields.includes(name);
  };

  return (
    <IonPage>
      <PageHeader header="Edit User" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
          <IonCol size="12">
              <div className={styles.header}>
                <IonImg
                  src="/svg/church_hive_icon.svg"
                  className={styles.logo}
                />
              </div>
            </IonCol>
            <IonCol size="12">
              <IonInput
                className={`ion-input-field ${
                  isFieldTouched("firstName") ? "" : "ion-untouched"
                }`}
                required
                type="text"
                label="First Name"
                labelPlacement="floating"
                value={updatedUser.firstName}
                onIonInput={(e) => {
                  const inputValue = e.detail.value;
                  if (inputValue) {
                    if (inputValue.slice(-1) === " ") {
                    } else {
                      handleInputChange("firstName", inputValue);
                    }
                  }
                }}
                onBlur={() => handleInputBlur("firstName")}
              />
            </IonCol>
            <IonCol size="12">
              <IonInput
                className={`ion-input-field ${
                  isFieldTouched("lastName") ? "" : "ion-untouched"
                }`}
                required
                type="text"
                label="Last Name"
                labelPlacement="floating"
                value={updatedUser.lastName}
                onIonInput={(e) => {
                  const inputValue = e.detail.value;
                  if (inputValue) {
                    if (inputValue.slice(-1) === " ") {
                    } else {
                      handleInputChange("lastName", inputValue);
                    }
                  }
                }}
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
                label="Email"
                labelPlacement="floating"
                value={updatedUser.email}
                onIonInput={(e) => {
                  const inputValue = e.detail.value;
                  if (inputValue) {
                    if (inputValue.slice(-1) === " ") {
                    } else {
                      handleInputChange("email", inputValue);
                    }
                  }
                }}
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
                value={updatedUser.password}
                onIonInput={(e) => {
                  const inputValue = e.detail.value;
                  if (inputValue) {
                    if (inputValue.slice(-1) === " ") {
                    } else {
                      handleInputChange("password", inputValue);
                    }
                  }
                }}
                onBlur={() => handleInputBlur("password")}
              />
            </IonCol>
            <IonCol size="12">
              <IonButton expand="full" onClick={handleSubmit} className={styles.button}>
                Submit
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default EditUser;
