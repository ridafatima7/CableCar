// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import { domainConfig } from "./APIS.jsx"; 

// Detect current hostname
const hostname = window.location.hostname;

// Get matching site config or fallback
const siteConfig = domainConfig[hostname] || domainConfig["localhost"];

// Dynamically update <title>
document.title = siteConfig.title;

// Dynamically update <link rel="icon">
const favicon = document.querySelector("link[rel='icon']");
if (favicon) {
  favicon.href = siteConfig.favicon;
}

// Render app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

