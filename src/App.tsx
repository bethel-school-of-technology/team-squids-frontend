import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { calendar, settings, home } from "ionicons/icons";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";
import ChurchFinder from "./pages/ChurchFinder";
import EventList from "./pages/EventFinder";
import ChurchProfile from "./pages/ChurchProfile";
import EventDetails from "./pages/EventDetails";
import ChurchUserProfile from "./pages/ChurchUserProfile";
import { useContext } from "react";
import { ChurchUserContext } from "./context/churchUserContext";
import CreateAccount from "./pages/CreateAccount";
import LoginAccount from "./pages/LoginAccount";
import AddChurch from "./pages/AddChurch";
import AddEvent from "./pages/AddEvent";
import EditChurch from "./pages/EditChurch";
import EditEvent from "./pages/EditEvent";

setupIonicReact();

const App: React.FC = () => {
  const { isLoggedIn, currentUserId } = useContext(ChurchUserContext);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/add-church" exact component={AddChurch} />
            <Route path="/churches/edit/:churchId" exact component={EditChurch}/>
            <Route path="/churches/:churchId" exact component={ChurchProfile} />
            <Route path="/churches" exact component={ChurchFinder} />

            <Route path="/add-event" exact component={AddEvent} />
            <Route path="/events/edit/:eventId" exact component={EditEvent} />
            <Route path="/events/:eventId" exact component={EventDetails} />
            <Route path="/events" exact component={EventList} />

            <Route path="/users/create-account" component={CreateAccount} />
            <Route path="/users/login-account" exact component={LoginAccount} />
            <Route path="/user/:userId" exact component={ChurchUserProfile} />
            
            <Route exact path="/" render={() => <Redirect to="/churches" />} />

          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="churches" href="/churches">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Churches</IonLabel>
            </IonTabButton>
            <IonTabButton tab="events" href="/events">
              <IonIcon aria-hidden="true" icon={calendar} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>
            {!currentUserId && (
              <IonTabButton tab="user" href="/users/create-account">
                <IonIcon aria-hidden="true" icon={settings} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            )}
            {currentUserId && (
              <IonTabButton tab="user" href={`/user/${currentUserId}`}>
                <IonIcon aria-hidden="true" icon={settings} />
                <IonLabel>Profile</IonLabel>
              </IonTabButton>
            )}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
