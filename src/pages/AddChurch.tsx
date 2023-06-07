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
  IonSelect,
  IonSelectOption,
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("churchName", inputValue);
                      }
                    }
                  }}
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("denomination", inputValue);
                      }
                    }
                  }}
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("location.street", inputValue);
                      }
                    }
                  }}
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("location.city", inputValue);
                      }
                    }
                  }}
                  onBlur={() => handleInputBlur("location.city")}
                />
                <br />

                <IonSelect
                  className={`ion-select-field ${isFieldTouched("location.state") ? "" : "ion-untouched"
                    }`}
                  label="State"
                  value={newChurch.location.state}
                  onIonChange={(e) => {
                    const selectedValue = e.detail.value;
                    handleInputChange("location.state", selectedValue);
                  }}
                  onBlur={() => handleInputBlur("location.state")}
                >
                  <IonSelectOption value="AL">Alabama</IonSelectOption>
                  <IonSelectOption value="AK">Alaska</IonSelectOption>
                  <IonSelectOption value="AZ">Arizona</IonSelectOption>
                  <IonSelectOption value="AR">Arkansas</IonSelectOption>
                  <IonSelectOption value="CA">California</IonSelectOption>
                  <IonSelectOption value="CO">Colorado</IonSelectOption>
                  <IonSelectOption value="CT">Connecticut</IonSelectOption>
                  <IonSelectOption value="DE">Delaware</IonSelectOption>
                  <IonSelectOption value="FL">Florida</IonSelectOption>
                  <IonSelectOption value="GA">Georgia</IonSelectOption>
                  <IonSelectOption value="HI">Hawaii</IonSelectOption>
                  <IonSelectOption value="ID">Idaho</IonSelectOption>
                  <IonSelectOption value="IL">Illinois</IonSelectOption>
                  <IonSelectOption value="IN">Indiana</IonSelectOption>
                  <IonSelectOption value="IA">Iowa</IonSelectOption>
                  <IonSelectOption value="KS">Kansas</IonSelectOption>
                  <IonSelectOption value="KY">Kentucky</IonSelectOption>
                  <IonSelectOption value="LA">Louisiana</IonSelectOption>
                  <IonSelectOption value="ME">Maine</IonSelectOption>
                  <IonSelectOption value="MD">Maryland</IonSelectOption>
                  <IonSelectOption value="MA">Massachusetts</IonSelectOption>
                  <IonSelectOption value="MI">Michigan</IonSelectOption>
                  <IonSelectOption value="MN">Minnesota</IonSelectOption>
                  <IonSelectOption value="MS">Mississippi</IonSelectOption>
                  <IonSelectOption value="MO">Missouri</IonSelectOption>
                  <IonSelectOption value="MT">Montana</IonSelectOption>
                  <IonSelectOption value="NE">Nebraska</IonSelectOption>
                  <IonSelectOption value="NV">Nevada</IonSelectOption>
                  <IonSelectOption value="NH">New Hampshire</IonSelectOption>
                  <IonSelectOption value="NJ">New Jersey</IonSelectOption>
                  <IonSelectOption value="NM">New Mexico</IonSelectOption>
                  <IonSelectOption value="NY">New York</IonSelectOption>
                  <IonSelectOption value="NC">North Carolina</IonSelectOption>
                  <IonSelectOption value="ND">North Dakota</IonSelectOption>
                  <IonSelectOption value="OH">Ohio</IonSelectOption>
                  <IonSelectOption value="OK">Oklahoma</IonSelectOption>
                  <IonSelectOption value="OR">Oregon</IonSelectOption>
                  <IonSelectOption value="PA">Pennsylvania</IonSelectOption>
                  <IonSelectOption value="RI">Rhode Island</IonSelectOption>
                  <IonSelectOption value="SC">South Carolina</IonSelectOption>
                  <IonSelectOption value="SD">South Dakota</IonSelectOption>
                  <IonSelectOption value="TN">Tennessee</IonSelectOption>
                  <IonSelectOption value="TX">Texas</IonSelectOption>
                  <IonSelectOption value="UT">Utah</IonSelectOption>
                  <IonSelectOption value="VT">Vermont</IonSelectOption>
                  <IonSelectOption value="VA">Virginia</IonSelectOption>
                  <IonSelectOption value="WA">Washington</IonSelectOption>
                  <IonSelectOption value="WV">West Virginia</IonSelectOption>
                  <IonSelectOption value="WI">Wisconsin</IonSelectOption>
                  <IonSelectOption value="WY">Wyoming</IonSelectOption>
                </IonSelect>
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("location.zip", inputValue);
                      }
                    }
                  }}
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("phoneNumber", inputValue);
                      }
                    }
                  }}
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("welcomeMessage", inputValue);
                      }
                    }
                  }}
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
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {
                        
                      } else {
                        handleInputChange("serviceTime", inputValue);
                      }
                    }
                  }}
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
