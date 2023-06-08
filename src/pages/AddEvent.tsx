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
