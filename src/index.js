import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.scss";

import store from "./redux/store";
import AppContainer from "./redux/containers/pages/AppContainer";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,

  document.getElementById("root"),
);
