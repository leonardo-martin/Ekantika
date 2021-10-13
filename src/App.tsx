import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppProvider from "./contexts/index";
import Routes from "./routes";

import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <AppProvider>
      <Routes />
    </AppProvider>
  </Router>
);

export default App;
