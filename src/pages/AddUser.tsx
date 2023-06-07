import React, { useContext, useState } from "react";
import {  IonContent, 
          IonHeader, 
          IonPage, 
          IonTitle, 
          IonToolbar, 
          IonInput, 
          IonButton, 
          IonList, 
          IonItem, 
          IonGrid,
          IonRow,
          IonCol} from '@ionic/react';
import { useHistory } from "react-router-dom";
import PageHeader from "../components/Global/PageHeader";
import UserProfile from "./ChurchUserProfile";
import { ChurchContext, NewChurch } from "../context/churchContext";
// I need to make a UserContext, and a NewUser file. 
import { ChurchUserContext } from "../context/churchUserContext";


const AddUser: React.FC = () => {
  const { NewChurchUser } = useContext(ChurchUserContext); 
  const [ newUser, setUser ] = useState<NewUser>({
    userId: "",
    churchName: "",
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: ""
  });
  



  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const history = useHistory();

  const handleInputChange = (
    name: string,
    value: string | number | Location
  ) => {
    setUser({
      userId: userId,
      username: username,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName
      });
    console.log(addUser);

  const handleSubmit = async () => {
    console.log(addUser);
    await createNewAccoount(addUser)
    history.push("/login");
  };
  //   const response = await fetch("http://localhost:8080/api/user/create", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(addUser)
  //       });
  // }

  }

    const [isTouched, setIsTouched] = useState(false);
    const [isValid, setIsValid] = useState<boolean>();
  
    const validateEmail = (email: string) => {
      return email.match(
        /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
    };
  
    const validate = (ev: Event) => {
      const value = (ev.target as HTMLTextAreaElement).value;
  
      setIsValid(undefined);
  
      if (value === '') return;
  
      validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
    };
  
    const markTouched = () => {
      setIsTouched(true);
    };
    
    const handleInputBlur = (name: string) => {
      if (!touchedFields.includes(name)) {
        setTouchedFields([...touchedFields, name]);
      }
    };
    
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      await NewChurchUser(newUser);
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
                  value={newUser.churchName}
                  onIonChange={(e) =>
                    handleInputChange("churchName", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("churchName")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("firstname") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="First Name"
                  labelPlacement="floating"
                  value={newUser.firstName}
                  onIonChange={(e) =>
                    handleInputChange("firtName", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("firstName")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("Last Name") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Last Name"
                  labelPlacement="floating"
                  value={newUser.lastName}
                  onIonChange={(e) =>
                    handleInputChange("lastName", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("lastName")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("email") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Email Address"
                  labelPlacement="floating"
                  value={newUser.email}
                  onIonChange={(e) =>
                    handleInputChange("email", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("email")}
                />
                <br />

                <IonInput
                  className={`ion-input-field ${
                    isFieldTouched("password") ? "" : "ion-untouched"
                  }`}
                  required
                  type="text"
                  label="Password"
                  labelPlacement="floating"
                  value={newUser.password}
                  onIonChange={(e) =>
                    handleInputChange("password", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("password")}
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
                  value={newUser.phoneNumber}
                  onIonChange={(e) =>
                    handleInputChange("phoneNumber", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("phoneNumber")}
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

export default AddUser;


   // const [churchName, setChurchName] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
  
    // const handleFormSubmit = () => {
    //   // Handle form submission logic here
    //   console.log('Submitted values:', churchName, firstName, lastName, email, password);
    // };

//       <><div>CreateAccount</div>
//       <IonPage>
//         <IonHeader>
//           <PageHeader header="Create a New User Account" />
//           <IonToolbar>
//             <IonTitle>Church Registration</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent>
//           <IonList>
//             <IonItem>
//               <IonTextarea label="Church Name" placeholder='Type church name here'>
//               </IonTextarea>
//             </IonItem>
//             <IonItem>
//               <IonTextarea label="First Name" placeholder='Type first name here'>
//               </IonTextarea>
//             </IonItem>
//             <IonItem>
//               <IonTextarea label="Last Name" placeholder='Type last name here'>
//               </IonTextarea>
//             </IonItem>
//             <IonItem>
//               <IonTextarea label="Phone Number" placeholder='Contact phone number'>
//               </IonTextarea>
//             </IonItem>
//             <IonItem>
//               <IonTextarea
//                 className={clsx({
//                   'ion-valid': isValid,
//                   'ion-invalid': isValid === false,
//                   'ion-touched': isTouched,
//                 })}
//                 fill="solid"
//                 label="Email"
//                 labelPlacement="floating"
//                 helperText="Enter a valid email"
//                 errorText="Invalid email"
//                 onIonInput={(event) => validate(event)}
//                 onIonBlur={() => markTouched()}>
//               </IonTextarea>
//             </IonItem>
//             <IonItem>
//               <IonTextarea label="Password" placeholder='Type password here'>
//               </IonTextarea>
//             </IonItem>
//             {/* <IonInput
//       value={churchName}
//       placeholder="Church Name"
//       onIonChange={(e) => setChurchName(e.target.value)} />
//     <IonInput
//       value={firstName}
//       placeholder="First Name"
//       onIonChange={(e) => setFirstName(e.target.value)} />
//     <IonInput
//       value={lastName}
//       placeholder="Last Name"
//       on */}
//           </IonList>
//         </IonContent>
//       </IonPage></>
// );

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

    
