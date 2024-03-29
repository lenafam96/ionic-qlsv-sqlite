import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { SQLiteHook, useSQLite } from "react-sqlite-hook";

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
import Page from "./pages/Page";

interface JsonListenerInterface {
  jsonListeners: boolean;
  setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>;
}
interface existingConnInterface {
  existConn: boolean;
  setExistConn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Singleton SQLite Hook
export let sqlite: SQLiteHook;
// Existing Connections Store
export let existingConn: existingConnInterface;
// Is Json Listeners used
export let isJsonListeners: JsonListenerInterface;

setupIonicReact();

const App: React.FC = () => {
  const [existConn, setExistConn] = useState(false);
  existingConn = { existConn: existConn, setExistConn: setExistConn };

  // !!!!! if you do not want to use the progress events !!!!!
  // since react-sqlite-hook 2.1.0
  // sqlite = useSQLite()
  // before
  // sqlite = useSQLite({})
  // !!!!!                                               !!!!!

  sqlite = useSQLite();
  console.log(`$$$ in App sqlite.isAvailable  ${sqlite.isAvailable} $$$`);
  const [data, setData] = useState(null);

  function handleData(data: any) {
    setData(data);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/api/data"
            render={({ location }) => {
              const searchParams = new URLSearchParams(location.search);
              const data = searchParams.get("data");
              handleData(data);
              return null;
            }}
          />
          <Route path="/home">{data ? <Page data={data} /> : <Home />}</Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          {/* <Route path="/add">
            <Add />
          </Route> */}
          <Route path="/data">
            <Page data={"data"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
