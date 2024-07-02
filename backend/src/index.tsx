import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import "./index.css";
import App from "./App";
import AuthContextProvider from './contexts/AuthContext';
import ChallengesContextProvider from "./contexts/ChallengesContext";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AuthContextProvider>
    <ChallengesContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </ChallengesContextProvider>
  </AuthContextProvider>
);
reportWebVitals();
