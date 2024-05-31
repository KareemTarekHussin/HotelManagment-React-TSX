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
import FacilitiesData from "./Modules/FacilitiesModule/components/FacilitiesData/FacilitiesData";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";
import ADSList from "./Modules/ADSModule/components/ADSList/ADSList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
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
        // <ProtectedRoute>
        <MasterLayout />
        // </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "rooms", element: <RoomsList /> },
        { path: "roomsdata", element: <RoomsData /> },
        { path: "facilities", element: <FacilitiesList /> },
        { path: "facilitiesdata", element: <FacilitiesData /> },
        { path: "adslist", element: <ADSList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
}
export default App;
