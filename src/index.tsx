import React from "react";
import ReactDOM from "react-dom";
import { AppFunction } from "./Components/App";
import "antd/dist/antd.css";
import "Stylesheets/Base.scss";
import { rootStore, RootStoreProvider } from "Store/RootStore";

ReactDOM.render(
  <React.StrictMode>
    <RootStoreProvider value={rootStore}>
      <AppFunction />
    </RootStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
