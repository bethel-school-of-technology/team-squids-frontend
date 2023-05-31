import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ChurchFinder from "./pages/ChurchFinder";
import EventList from "./pages/EventFinder";
import ChurchProfile from "./pages/ChurchProfile";
import { calendar, settings, home } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import EventDetails from "./pages/EventDetails";
import ChurchUserProfile from "./pages/ChurchUserProfile";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
      <Route path="/churches" exact={true}>
          <ChurchFinder />
        </Route>
        <Route path="/churches/:churchId" exact={true}>
          <ChurchProfile />
        </Route>
        <Route path="/events" exact={true}>
          <EventList />
        </Route>
        <Route path="/events/:eventId" exact={true}>
          <EventDetails />
        </Route>
        <Route exact path="/">
          <Redirect to="/churches" />
        </Route>
        <Route path="/user" exact={true}>
          <ChurchUserProfile />
        </Route>
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
          <IonTabButton tab="user" href="/user">
            <IonIcon aria-hidden="true" icon={settings} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
  
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
