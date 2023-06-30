import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import styles from "./scss/application.scss";
import { GoogleOAuthProvider } from '@react-oauth/google';

// import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}>
    <React.StrictMode>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </React.StrictMode>
  </GoogleOAuthProvider>
);

