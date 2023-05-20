import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import {
  IonTabs,
  IonTabBar,
  IonRouterOutlet,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import { calendar, settings, home } from "ionicons/icons";
import { profile } from "console";

import ChurchFinder from "./ChurchFinder";
import EventList from "./EventList";
import ChurchProfile from "./ChurchProfile";

function NavBar() {
  return (
    <IonReactRouter>
      <IonTabs>
        {/* This is how the documentation says to handle the links */}
        <IonRouterOutlet>
          <Route
            path="/churches"
            render={() => <ChurchFinder />}
            exact={true}
          />
          <Route path="/events" render={() => <EventList />} exact={true} />
          <Route
            path="/profile"
            render={() => <ChurchProfile />}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Churches" href="/churches">
            <IonIcon icon={home} />
            <IonLabel>Churches</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Events" href="/events">
            <IonIcon icon={calendar} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Profile" href="/profile">
            <IonIcon icon={settings} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

export default NavBar;