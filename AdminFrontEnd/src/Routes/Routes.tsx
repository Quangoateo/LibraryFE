import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/LoginPage/Login";
import HomePage from "../Pages/HomePage/HomePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ManageBooks from "../Pages/ManageBooksPage/ManageBooks";
import ManageRental from "../Pages/ManageRentalPage/ManageRental";
import Regulation from "../Pages/RegulationPage/Regulation";
import Calendar from "../Pages/CalendarPage/CalendarPage";
import SideBar from "../Components/SideBar/SideBar";
import Notification from "../Pages/NotificationPage/NotificationPage";
import HelpPage from "../Pages/HelpPage/HelpPage";
import App from "../App";
import { Navigate } from "react-router-dom";
import ForgotPassword from "../Pages/ForgotPasswordPage/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Redirect from root to login page
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "/home", element: <HomePage /> }, // Change this route to the home page, if needed
      { path: "/register", element: <RegisterPage /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/managerentals", element: <ManageRental /> },
      { path: "/managebooks", element: <ManageBooks /> },
      { path: "/notification", element: <Notification />},
      { path: "/regulations", element: <Regulation /> },
      { path: "/sidebar", element: <SideBar /> },
      { path: "/help", element: <HelpPage /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
    ],
  },
]);
