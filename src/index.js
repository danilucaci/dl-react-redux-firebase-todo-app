import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import store, { persistor } from "./redux/store";
import AppContainer from "./redux/containers/pages/AppContainer";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <AppContainer />
          </SnackbarProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </PersistGate>
  </Provider>,

  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
