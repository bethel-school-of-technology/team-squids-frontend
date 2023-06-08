import React, { useContext, useState } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonInput,
  IonButton,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import PageHeader from "../components/Global/PageHeader";
import { EventContext, NewEvent } from "../context/eventContext";
import { ChurchUserContext } from "../context/churchUserContext";
import { useFetchChurchUser } from "../hooks/useFetchChurchUser";

const AddEvent: React.FC = () => {
  const { createEvent } = useContext(EventContext);
  const { currentUserId } = useContext(ChurchUserContext);
  const { churchUser, loadingStatus, error } =
    useFetchChurchUser(currentUserId);
  const today: Date = new Date();

  const [newEvent, setNewEvent] = useState<NewEvent>({
    churchId: 0,
    eventTitle: "",
    date: today.toISOString(),
    location: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    eventType: "",
    description: "",
    imageUrl: "",
  });

  const [localDate, setLocalDate] = useState<string>("");
  const [touchedFields, setTouchedFields] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const history = useHistory();

  const handleInputChange = (
    name: string,
    value: string | string[] | number | Location
  ) => {
    if (name === "date") {
      const isoDate = value as string;
      const localDate = new Date(isoDate).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        date: isoDate,
      }));
      setLocalDate(localDate);
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        location: {
          ...prevEvent.location,
          [key]: typeof value === "string" ? (value as string).trim() : value,
        },
      }));
    } else {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
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
    await createEvent(newEvent);
    history.push(`/user/${currentUserId}`);
  };

  const isFieldTouched = (name: string) => {
    return touchedFields.includes(name);
  };

  return (
    <IonPage>
      <PageHeader header="Add an Event" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonSelect
                className={`ion-input-field ${isFieldTouched("churchId") ? "" : "ion-untouched"
                  }`}
                placeholder="Select Church"
                label="Church"
                labelPlacement="floating"
                value={newEvent.churchId}
                onIonChange={(e) =>
                  handleInputChange("churchId", e.detail.value!)
                }
                onBlur={() => handleInputBlur("churchId")}
              >
                {churchUser &&
                  churchUser.Churches.map((church) => (
                    <IonSelectOption
                      key={church.churchId}
                      value={church.churchId}
                    >
                      {church.churchName}
                    </IonSelectOption>
                  ))}
              </IonSelect>
              <br />

              <div>
                <IonInput
                  className={`ion-input-field ${isFieldTouched("eventTitle") ? "" : "ion-untouched"
                    }`}
                  required
                  type="text"
                  label="Event Title"
                  labelPlacement="floating"
                  value={newEvent.eventTitle}
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {

                      } else {
                        handleInputChange("eventTitle", inputValue);
                      }
                    }
                  }}
                  onBlur={() => handleInputBlur("eventTitle")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${isFieldTouched("date") ? "" : "ion-untouched"
                    }`}
                  required
                  type="text"
                  placeholder=""
                  label="Event Date and Time"
                  labelPlacement="floating"
                  value={localDate}
                  readonly
                  onClick={() => setShowDatePicker(true)}
                  onBlur={() => handleInputBlur("date")}
                />
                <IonModal isOpen={showDatePicker}>
                  <IonDatetime
                    color="primary"
                    value={newEvent.date}
                    title="Event Date"
                    showDefaultTitle={true}
                    showDefaultButtons={true}
                    onIonChange={(e) => {
                      handleInputChange("date", e.detail.value as string);
                      setShowDatePicker(false);
                    }}
                  />
                </IonModal>

                <br />

                <IonInput
                  className={`ion-input-field ${isFieldTouched("location.street") ? "" : "ion-untouched"
                    }`}
                  required
                  type="text"
                  label="Street"
                  labelPlacement="floating"
                  value={newEvent.location.street}
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
                  className={`ion-input-field ${isFieldTouched("location.city") ? "" : "ion-untouched"
                    }`}
                  required
                  type="text"
                  label="City"
                  labelPlacement="floating"
                  value={newEvent.location.city}
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
                  value={newEvent.location.state}
                  onIonChange={(e) => {
                    const selectedValue = e.detail.value;
                    handleInputChange("location.state", selectedValue);
                  }}
                  onBlur={() => handleInputBlur("location.state")}
                >
                  <IonSelectOption value="Alabama">Alabama</IonSelectOption>
                  <IonSelectOption value="Alaska">Alaska</IonSelectOption>
                  <IonSelectOption value="Arizona">Arizona</IonSelectOption>
                  <IonSelectOption value="Arkansas">Arkansas</IonSelectOption>
                  <IonSelectOption value="California">California</IonSelectOption>
                  <IonSelectOption value="Colorado">Colorado</IonSelectOption>
                  <IonSelectOption value="Connecticut">Connecticut</IonSelectOption>
                  <IonSelectOption value="Delaware">Delaware</IonSelectOption>
                  <IonSelectOption value="Florida">Florida</IonSelectOption>
                  <IonSelectOption value="Georgia">Georgia</IonSelectOption>
                  <IonSelectOption value="Hawaii">Hawaii</IonSelectOption>
                  <IonSelectOption value="Idaho">Idaho</IonSelectOption>
                  <IonSelectOption value="Illinois">Illinois</IonSelectOption>
                  <IonSelectOption value="Indiana">Indiana</IonSelectOption>
                  <IonSelectOption value="Iowa">Iowa</IonSelectOption>
                  <IonSelectOption value="Kansas">Kansas</IonSelectOption>
                  <IonSelectOption value="Kentucky">Kentucky</IonSelectOption>
                  <IonSelectOption value="Louisiana">Louisiana</IonSelectOption>
                  <IonSelectOption value="Maine">Maine</IonSelectOption>
                  <IonSelectOption value="Maryland">Maryland</IonSelectOption>
                  <IonSelectOption value="Massachusetts">Massachusetts</IonSelectOption>
                  <IonSelectOption value="Michigan">Michigan</IonSelectOption>
                  <IonSelectOption value="Minnesota">Minnesota</IonSelectOption>
                  <IonSelectOption value="Mississippi">Mississippi</IonSelectOption>
                  <IonSelectOption value="Missouri">Missouri</IonSelectOption>
                  <IonSelectOption value="Montana">Montana</IonSelectOption>
                  <IonSelectOption value="Nebraska">Nebraska</IonSelectOption>
                  <IonSelectOption value="Nevada">Nevada</IonSelectOption>
                  <IonSelectOption value="New Hampshire">New Hampshire</IonSelectOption>
                  <IonSelectOption value="New Jersey">New Jersey</IonSelectOption>
                  <IonSelectOption value="New Mexico">New Mexico</IonSelectOption>
                  <IonSelectOption value="New York">New York</IonSelectOption>
                  <IonSelectOption value="North Carolina">North Carolina</IonSelectOption>
                  <IonSelectOption value="North Dakota">North Dakota</IonSelectOption>
                  <IonSelectOption value="Ohio">Ohio</IonSelectOption>
                  <IonSelectOption value="Oklahoma">Oklahoma</IonSelectOption>
                  <IonSelectOption value="Oregon">Oregon</IonSelectOption>
                  <IonSelectOption value="Pennsylvania">Pennsylvania</IonSelectOption>
                  <IonSelectOption value="Rhode Island">Rhode Island</IonSelectOption>
                  <IonSelectOption value="South Carolina">South Carolina</IonSelectOption>
                  <IonSelectOption value="South Dakota">South Dakota</IonSelectOption>
                  <IonSelectOption value="Tennessee">Tennessee</IonSelectOption>
                  <IonSelectOption value="Texas">Texas</IonSelectOption>
                  <IonSelectOption value="Utah">Utah</IonSelectOption>
                  <IonSelectOption value="Vermont">Vermont</IonSelectOption>
                  <IonSelectOption value="Virginia">Virginia</IonSelectOption>
                  <IonSelectOption value="Washington">Washington</IonSelectOption>
                  <IonSelectOption value="West Virginia">West Virginia</IonSelectOption>
                  <IonSelectOption value="Wisconsin">Wisconsin</IonSelectOption>
                  <IonSelectOption value="Wyoming">Wyoming</IonSelectOption>
                </IonSelect>
                <br />

                <IonInput
                  className={`ion-input-field ${isFieldTouched("location.zip") ? "" : "ion-untouched"
                    }`}
                  required
                  type="text"
                  label="Zip Code"
                  labelPlacement="floating"
                  value={newEvent.location.zip}
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

                <IonSelect
                  className={`ion-input-field ${isFieldTouched("eventType") ? "" : "ion-untouched"
                    }`}
                  placeholder="Select Event Type"
                  label="Event Type"
                  labelPlacement="floating"
                  value={newEvent.eventType}
                  onIonChange={(e) =>
                    handleInputChange("eventType", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("eventType")}
                >
                  <IonSelectOption value="Family">Family</IonSelectOption>
                  <IonSelectOption value="Youth">Youth</IonSelectOption>
                  <IonSelectOption value="Young Adults">
                    Young Adults
                  </IonSelectOption>
                  <IonSelectOption value="Single">Single</IonSelectOption>
                  <IonSelectOption value="Womans">Womans</IonSelectOption>
                  <IonSelectOption value="Mens">Mens</IonSelectOption>
                  <IonSelectOption value="Senior">Senior</IonSelectOption>
                </IonSelect>
                <br />

                <IonTextarea
                  className={`ion-input-field ${isFieldTouched("description") ? "" : "ion-untouched"
                    }`}
                  rows={10}
                  label="Description"
                  labelPlacement="floating"
                  value={newEvent.description}
                  onIonInput={(e) => {
                    const inputValue = e.detail.value;
                    if (inputValue) {
                      if (inputValue.slice(-1) === " ") {

                      } else {
                        handleInputChange("description", inputValue);
                      }
                    }
                  }}
                  onBlur={() => handleInputBlur("description")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${isFieldTouched("imageUrl") ? "" : "ion-untouched"
                    }`}
                  required
                  type="url"
                  label="Event Image URL"
                  labelPlacement="floating"
                  value={newEvent.imageUrl}
                  onIonInput={(e) =>
                    handleInputChange("imageUrl", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("imageUrl")}
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

export default AddEvent;
