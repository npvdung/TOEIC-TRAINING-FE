import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./config/router/router";
import "antd/dist/antd.css";
import "./BaseStyle.scss";
import { HvxContextProvider } from "./contexts";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <HvxContextProvider>
      <ToastContainer />
      <Router>
        <AppRouter />
      </Router>
    </HvxContextProvider>
  );
}

export default App;
