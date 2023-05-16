import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import ChurchFinder from "./pages/ChurchFinder";
import EventList from "./pages/EventList";
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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/churches" component={ChurchFinder} />
        <Route path="/events" component={EventList} />
        <Route path="/church-profile" component={ChurchProfile} />
        <Route exact path="/">
          <Redirect to="/churches" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/churches">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Churches</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/events">
            <IonIcon aria-hidden="true" icon={calendar} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/church-profile">
            <IonIcon aria-hidden="true" icon={settings} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
  
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
