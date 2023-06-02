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
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import PageHeader from "../components/Global/PageHeader";
import { ChurchContext, NewChurch } from "../context/churchContext";
import { ChurchUserContext } from "../context/churchUserContext";

const AddChurch: React.FC = () => {
  const { createChurch } = useContext(ChurchContext);
  const { currentUserId } = useContext(ChurchUserContext);
  const [newChurch, setChurch] = useState<NewChurch>({
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

  const history = useHistory();

  const handleInputChange = (name: string, value: string) => {
    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setChurch({
        ...newChurch,
        location: { ...newChurch.location, [key]: value },
      });
    } else {
      setChurch({
        ...newChurch,
        [name]: value,
      });
    }
    console.log(newChurch);
  };

  const handleSubmit = async () => {
    console.log(newChurch);
    await createChurch(newChurch);
    history.push(`/user/${currentUserId}`);
  };

  return (
    <IonPage>
      <PageHeader header="Add a Church" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <div>
                <IonLabel color="medium">Church Name</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("churchName", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Denomination</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("denomination", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Street</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("location.street", e.detail.value!)
                  }
                />

                <IonLabel color="medium">City</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("location.city", e.detail.value!)
                  }
                />

                <IonLabel color="medium">State</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("location.state", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Zip</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("location.zip", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Phone Number</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("phoneNumber", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Church Email</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("churchEmail", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Welcome Message</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("welcomeMessage", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Service Time</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("serviceTime", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Image URL</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("imageUrl", e.detail.value!)
                  }
                />

                <IonLabel color="medium">Website</IonLabel>
                <IonInput
                  required
                  onIonChange={(e) =>
                    handleInputChange("website", e.detail.value!)
                  }
                />

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
