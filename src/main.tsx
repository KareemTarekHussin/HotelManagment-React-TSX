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
import FavsContextProvider from "./Modules/Context/FavsContext.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContextProvider>
      <SidebarProvider>
        <FavsContextProvider>
          <App />
        </FavsContextProvider>
      </SidebarProvider>
    </ToastContextProvider>
  </React.StrictMode>
);
