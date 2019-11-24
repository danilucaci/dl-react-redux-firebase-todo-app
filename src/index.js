import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

import "./index.scss";

import store, { persistor } from "./redux/store";
import AppContainer from "./redux/containers/pages/AppContainer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <BrowserRouter>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            maxSnack={5}
          >
            <AppContainer />
          </SnackbarProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </PersistGate>
  </Provider>,

  document.getElementById("root"),
);
