import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.scss";

import store, { persistor } from "./redux/store";
import AppContainer from "./redux/containers/pages/AppContainer";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>,

  document.getElementById("root"),
);
