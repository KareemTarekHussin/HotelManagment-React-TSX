import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Modules/SharedModule/components/AuthLayout/AuthLayout";
import NotFound from "./Modules/SharedModule/components/NotFound/NotFound";
import Login from "./Modules/AuthenticationModule/components/Login/Login";
import Register from "./Modules/AuthenticationModule/components/Register/Register";
import ForgetPass from "./Modules/AuthenticationModule/components/ForgetPass/ForgetPass";
import ResetPass from "./Modules/AuthenticationModule/components/ResetPass/ResetPass";
import MasterLayout from "./Modules/SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./Modules/DashboardModule/components/Dashboard/Dashboard";
import RoomsList from "./Modules/RoomsModule/components/RoomsList/RoomsList";
import RoomsData from "./Modules/RoomsModule/components/RoomsData/RoomsData";
import FacilitiesList from "./Modules/FacilitiesModule/components/FacilitiesList/FacilitiesList";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";
import ADSList from "./Modules/ADSModule/components/ADSList/ADSList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContextProvider from "./Modules/Context/AuthContext";
import ProtectedRoute from "./Modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingList from "./Modules/BookingModule/components/BookingList";
import DashboardUser from "./Modules/LandingPageModule/components/DashboardUser";
import Details from "./Modules/LandingPageModule/components/Details";
import Explore from "./Modules/LandingPageModule/components/Explore";
import Favourites from "./Modules/LandingPageModule/components/Favourites";
import UserLayout from "./Modules/SharedModule/components/UserLayout/UserLayout";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    },
    {
      path: "DashBoard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "roomsdata", element: <RoomsData /> },
        { path: "roomsedit/:id", element: <RoomsData /> },
        { path: "facilities", element: <FacilitiesList /> },
        { path: "adslist", element: <ADSList /> },
        { path: "users", element: <UsersList /> },
        { path: "booking", element: <BookingList /> },
      ],
    },
    ///user Path
    {
      path: "/",
      element:<DashboardUser/>,
      errorElement: <NotFound />,
      children: [
     { path: "", element: <DashboardUser /> },
     { path: "dashuser", element: <DashboardUser /> },
     { path: "details", element: <Details /> },
     { path: "explore", element: <Explore /> },
     { path: "favorites", element: <Favourites /> },
      ]
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <div className="App">
          <ToastContainer />
          <RouterProvider router={routes} />
        </div>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
export default App;
