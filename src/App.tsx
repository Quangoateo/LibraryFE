// src/App.tsx
import React from "react";
import "./App.css";
import Sidenav from "./Components/SideBar/SideBar";
import { Outlet, useLocation } from "react-router";

const App: React.FC = () => {
  const location = useLocation();

  // Define the routes where the side navigation should not be displayed
  const excludedRoutes = ["/login", "/register","/forgot-password"];

  // Check if the current route is excluded 
  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {!isExcludedRoute && <Sidenav />}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
