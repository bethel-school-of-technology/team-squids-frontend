import React, { useContext, useState } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonInput,
  IonLabel,
  IonButton,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import PageHeader from "../components/Global/PageHeader";
import { ChurchContext, NewChurch } from "../context/churchContext";
import { ChurchUserContext } from "../context/churchUserContext";

const AddChurch: React.FC = () => {
  const { createChurch } = useContext(ChurchContext);
  const { currentUserId, getChurchUser } = useContext(ChurchUserContext);
  const [newChurch, setNewChurch] = useState<NewChurch>({
    userId: currentUserId,
    churchName: "",
    denomination: "",
    location: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    phoneNumber: "",
    churchEmail: "",
    welcomeMessage: "",
    serviceTime: "",
    imageUrl: "",
    website: "",
  });
  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const history = useHistory();

  const handleInputChange = (
    name: string,
    value: string | number | Location
  ) => {
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setNewChurch((prevChurch) => ({
        ...prevChurch,
        location: {
          ...prevChurch.location,
          [key]: typeof value === "string" ? (value as string).trim() : value,
        },
      }));
    } else {
      setNewChurch((prevChurch) => ({
        ...prevChurch,
        [name]: typeof value === "string" ? (value as string).trim() : value,
      }));
    }
  };

  const handleInputBlur = (name: string) => {
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name]);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await createChurch(newChurch);
    await getChurchUser(currentUserId);
    history.push(`/user/${currentUserId}`);
  };

  const isFieldTouched = (name: string) => {
    return touchedFields.includes(name);
  };

  return (
    <IonPage>
      <PageHeader header="Add a Church" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12"> 
              <div>
                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("churchName") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Church Name"
                  labelPlacement="floating"
                  value={newChurch.churchName}
                  onIonInput={(e) =>
                    handleInputChange("churchName", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("churchName")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("denomination") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Denomination"
                  labelPlacement="floating"
                  value={newChurch.denomination}
                  onIonInput={(e) =>
                    handleInputChange("denomination", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("denomination")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("location.street") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Street"
                  labelPlacement="floating"
                  value={newChurch.location.street}
                  onIonInput={(e) =>
                    handleInputChange("location.street", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("location.street")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("location.city") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="City"
                  labelPlacement="floating"
                  value={newChurch.location.city}
                  onIonInput={(e) =>
                    handleInputChange("location.city", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("location.city")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("location.state") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="State"
                  labelPlacement="floating"
                  value={newChurch.location.state}
                  onIonInput={(e) =>
                    handleInputChange("location.state", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("location.state")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("location.zip") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Zip Code"
                  labelPlacement="floating"
                  value={newChurch.location.zip}
                  onIonInput={(e) =>
                    handleInputChange("location.zip", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("location.zip")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("phoneNumber") ? "" : "ion-untouched"
                  }`}
                  required
                  type="tel"
                  label="Phone Number"
                  labelPlacement="floating"
                  value={newChurch.phoneNumber}
                  onIonInput={(e) =>
                    handleInputChange("phoneNumber", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("phoneNumber")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("churchEmail") ? "" : "ion-untouched"
                  }`}
                  required
                  type="email"
                  label="Church Email"
                  labelPlacement="floating"
                  value={newChurch.churchEmail}
                  onIonInput={(e) =>
                    handleInputChange("churchEmail", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("churchEmail")}
                />
                <br />

                <IonTextarea
                  className={`ion-input-field ${
                    isFieldTouched("welcomeMessage") ? "" : "ion-untouched"
                  }`}
                  required
                  label="Welcome Message"
                  labelPlacement="floating"
                  rows={10}
                  value={newChurch.welcomeMessage}
                  onIonInput={(e) =>
                    handleInputChange("welcomeMessage", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("welcomeMessage")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("serviceTime") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Service Time"
                  labelPlacement="floating"
                  value={newChurch.serviceTime}
                  onIonInput={(e) =>
                    handleInputChange("serviceTime", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("serviceTime")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("imageUrl") ? "" : "ion-untouched"
                  }`}
                  required
                  type="url"
                  label="Church Image URL"
                  labelPlacement="floating"
                  value={newChurch.imageUrl}
                  onIonInput={(e) =>
                    handleInputChange("imageUrl", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("imageUrl")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("website") ? "" : "ion-untouched"
                  }`}
                  required
                  type="url"
                  label="Church Website"
                  labelPlacement="floating"
                  value={newChurch.website}
                  onIonInput={(e) =>
                    handleInputChange("website", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("website")}
                />
                <br />
                <br />

                <IonButton expand="full" onClick={handleSubmit}>
                  Submit
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AddChurch;
