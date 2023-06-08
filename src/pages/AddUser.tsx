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
import { ChurchUserContext, NewChurchUser } from "../context/churchUserContext";


const AddUser: React.FC = () => {
  const { createChurchUser } = useContext(ChurchUserContext); 
  const [ newUser, setNewUser ] = useState<NewChurchUser>({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });
  
  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const history = useHistory();

  const handleInputChange = (
    name: string,
    value: string | number 
  ) => {
      setNewUser((prevValue) => ({
        ...prevValue,
        // [name]: typeof value === "string" ? (value as string).trim() : value,
        [name]: value,  
      }));
    // console.log(newUser);
  }

    const [isTouched, setIsTouched] = useState(false);

    
    const handleInputBlur = (name: string) => {
      if (!touchedFields.includes(name)) {
        setTouchedFields([...touchedFields, name]);
      }
    };
    
    // const handleSubmit = async (event: any) => {
    //   event.preventDefault();
    //   console.log(newUser);
    //   await createChurchUser(newUser);
    //   // await getChurchUser(currentUserId);
    //   history.push(`/users/login-account`);
    //   if ( handleSubmit.newUser == valid )
    //         { } else () { } 
    //    };
    
       const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(newUser);
        // await createChurchUser(newUser);
        // await getChurchUser(currentUserId);
        const isCreateSuccessful = await createChurchUser(newUser);
        if (isCreateSuccessful) {
          history.push(`/users/login-account`);
          console.log('true');
        } else {
          // Handle the error
          console.log('false');
        }
      };


    const isFieldTouched = (name: string) => {
      return touchedFields.includes(name);
    };
  
 


    return (
      <IonPage>
      <PageHeader header="Create Account" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12"> 
              <div>
                {/* <IonInput
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
                /> */}
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
                  onIonInput={(e) =>
                    handleInputChange("firstName", e.detail.value!)
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
                  onIonInput={(e) =>
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
                  type="email"
                  label="Email Address"
                  labelPlacement="floating"
                  value={newUser.email}
                  onIonInput={(e) =>
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
                  type="password"
                  label="Password"
                  labelPlacement="floating"
                  value={newUser.password}
                  onIonInput={(e) =>
                    handleInputChange("password", e.detail.value!)
                  }
                  onBlur={() => handleInputBlur("password")}
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

    
