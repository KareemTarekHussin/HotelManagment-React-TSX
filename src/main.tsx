import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import ToastContextProvider from "./Modules/Context/ToastContext.tsx";
import "./index.css";
import { SidebarProvider } from './Modules/Context/SidebarContext';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ToastContextProvider>
  </React.StrictMode>
);
