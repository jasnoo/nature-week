import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import styles from "./scss/application.scss";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);


