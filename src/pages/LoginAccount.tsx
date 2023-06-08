import {
  IonCol,
  IonContent,
  IonItem,
  IonButton,
  IonLabel,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonInput,
} from "@ionic/react";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import ChurchUserInfo from "../components/ChurchUsers/ChurchUserInfo";
import { ChurchUser, ChurchUserContext, LoginChurchUser, NewChurchUser } from "../context/churchUserContext";
import PageHeader from "../components/Global/PageHeader";


const LoginAccount: React.FC = () => {
  // const emailRef = useRef();
  // const errRef = useRef();


  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  // const [loading, setLoading] = useState(false);

  // const [churchUsers, setChurchUsers] = useState<ChurchUser[]>([]);
  // const [churchUser, setChurchUser] = useState<ChurchUser>();

  const [ newUser, setNewUser ] = useState<LoginChurchUser>({
    email: "",
    password:""
  });

  const {loginChurchUser} = useContext(ChurchUserContext);
  
  const history = useHistory();

  // useEffect(() => {
  //     useRef.current.focus();
  //     }, [])

  // useEffect(() => {
  //   setErrorMessage('');
  // }, [email, password])

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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(newUser);
    // await createChurchUser(newUser);
    // await getChurchUser(currentUserId);
    const isCreateSuccessful = await loginChurchUser(newUser);
    if (isCreateSuccessful) {
      history.push(`/churches`);
      console.log('true');
    } else {
      // Handle the error
      console.log('false');
    }
  };

 


  const [touchedFields, setTouchedFields] = useState<string[]>([]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // const history = useHistory();

  const isFieldTouched = (name: string) => {
    return touchedFields.includes(name);
  };

  const handleInputBlur = (name: string) => {
    if (!touchedFields.includes(name)) {
      setTouchedFields([...touchedFields, name]);
    }
  }
  return (
    <IonPage>

    <PageHeader header="Login Account" />
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
          <IonItem>
            <IonInput
              className={`ion-input-field ${isFieldTouched("email") ? "" : "ion-untouched"
                }`}
              required
              type="email"
              label="Email Address"
              labelPlacement="floating"
              value={newUser.email}
              onIonInput={(e) => handleInputChange("email", e.detail.value!)}
              onBlur={() => handleInputBlur("email")}
            />
            </IonItem>
            </IonCol>
            <br />
            <br />
                <IonCol size="12">
                  <IonItem>
            <IonInput
              className={`ion-input-field ${isFieldTouched("password") ? "" : "ion-untouched"
                }`}
              required
              type="password"
              label="Password"
              labelPlacement="floating"
              value={newUser.password}
              onIonInput={(e) => handleInputChange("password", e.detail.value!)}
              onBlur={() => handleInputBlur("password")}
            />
            </IonItem>
            </IonCol>
            <br />
            <br />
            <IonCol size="12">
            <IonButton expand="full" onClick={handleSubmit}>
              Submit
            </IonButton>
            </IonCol>
          {/* </IonItem> */}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>

  )
}


export default LoginAccount;