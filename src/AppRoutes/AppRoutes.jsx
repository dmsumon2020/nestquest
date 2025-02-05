import { Route, Routes } from "react-router";
import MainLayout from "../Layouts/MainLayout.jsx";
import Home from "../Pages/Home/Home.jsx";
import DashboardLayout from "../Layouts/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { Helmet } from "react-helmet-async";
import SignIn from "../Pages/SignIn/SignIn.jsx";
import Registration from "../Pages/Registration/Registration.jsx";
import PropertyDetails from "../Pages/PropertyDetails/PropertyDetails.jsx";
import UserProfile from "../Dashboard/User/UserProfile/UserProfile.jsx";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome.jsx";
import Wishlist from "../Dashboard/User/Wishlist/Wishlist.jsx";
import PropertyBought from "../Dashboard/User/PropertyBought/PropertyBought";
import UserReviews from "../Dashboard/User/UserReviews/UserReviews.jsx";
import MakeAnOffer from "../Dashboard/User/MakeAnOffer/MakeAnOffer.jsx";
import AddProperty from "../Dashboard/Agent/AddProperty/AddProperty.jsx";
import AgentRoute from "./AgentRoute.jsx";
import AddedProperty from "../Dashboard/Agent/AddedProperty/AddedProperty.jsx";
import UpdateProperty from "../Dashboard/Agent/UpdateProperty/UpdateProperty.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManageProperties from "../Dashboard/Admin/ManageProperties/ManageProperties";
import ManageUsers from "../Dashboard/Admin/ManageUsers/ManageUsers";
import ManageReviews from "../Dashboard/Admin/ManageReviews/ManageReviews";
import RequestedProperties from "../Dashboard/Agent/RequestedProperties/RequestedProperties.jsx";
import SoldProperties from "../Dashboard/Agent/SoldProperties/SoldProperties.jsx";
import PaymentPage from "../Dashboard/User/PaymentPage/PaymentPage.jsx";
import AdvertiseProperty from "../Dashboard/Admin/AdvertiseProperty/AdvertiseProperty.jsx";
import AllPropertiesPage from "../Pages/AllPropertiesPage/AllPropertiesPage.jsx";
import NotFound from "../Pages/NotFound/NotFound.jsx";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <>
              <Helmet>
                <title>Home | NestQuest</title>
              </Helmet>
              <Home />
            </>
          }
        />

        <Route
          path="/signin"
          element={
            <>
              <Helmet>
                <title>Signin | NestQuest</title>
              </Helmet>
              <SignIn />
            </>
          }
        />
        <Route
          path="/registration"
          element={
            <>
              <Helmet>
                <title>Registration | NestQuest</title>
              </Helmet>
              <Registration />
            </>
          }
        />

        <Route
          path="/all-properties"
          element={
            <>
              <Helmet>
                <title>All Properties | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <AllPropertiesPage />
              </PrivateRoute>
            </>
          }
        />

        <Route
          path="/property-details/:id"
          element={
            <>
              <Helmet>
                <title>Property Details | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <PropertyDetails />
              </PrivateRoute>
            </>
          }
        />
      </Route>

      {/* Dashboard Layout */}
      {/* routes for normal users  */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <>
              <Helmet>
                <title>Dashboard | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <DashboardHome />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/dashboard/my-profile"
          element={
            <>
              <Helmet>
                <title>Profile | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/dashboard/wishlist"
          element={
            <>
              <Helmet>
                <title>Wishlist | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/dashboard/property-bought"
          element={
            <>
              <Helmet>
                <title>Property Bought | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <PropertyBought />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/dashboard/my-reviews"
          element={
            <>
              <Helmet>
                <title>My Reviews | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <UserReviews />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/dashboard/make-an-offer"
          element={
            <>
              <Helmet>
                <title>Make an offer | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <MakeAnOffer />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/dashboard/payment"
          element={
            <>
              <Helmet>
                <title>Payment | NestQuest</title>
              </Helmet>
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            </>
          }
        />
        {/* routes for agents  */}
        <Route
          path="/dashboard/add-property"
          element={
            <>
              <Helmet>
                <title>Add an Property | NestQuest</title>
              </Helmet>

              <AgentRoute>
                <AddProperty />
              </AgentRoute>
            </>
          }
        />
        <Route
          path="/dashboard/added-property"
          element={
            <>
              <Helmet>
                <title>My Added Properties | NestQuest</title>
              </Helmet>

              <AgentRoute>
                <AddedProperty />
              </AgentRoute>
            </>
          }
        />
        <Route
          path="/dashboard/update-property/:id"
          element={
            <>
              <Helmet>
                <title>Update a Property | NestQuest</title>
              </Helmet>

              <AgentRoute>
                <UpdateProperty />
              </AgentRoute>
            </>
          }
        />

        <Route
          path="/dashboard/requested-properties"
          element={
            <>
              <Helmet>
                <title>Requested Properties | NestQuest</title>
              </Helmet>

              <AgentRoute>
                <RequestedProperties />
              </AgentRoute>
            </>
          }
        />

        <Route
          path="/dashboard/sold-properties"
          element={
            <>
              <Helmet>
                <title>Sold Properties | NestQuest</title>
              </Helmet>

              <AgentRoute>
                <SoldProperties />
              </AgentRoute>
            </>
          }
        />

        {/* routes for admin  */}
        <Route
          path="/dashboard/manage-properties"
          element={
            <>
              <Helmet>
                <title>Manage Properties | NestQuest</title>
              </Helmet>

              <AdminRoute>
                <ManageProperties />
              </AdminRoute>
            </>
          }
        />

        <Route
          path="/dashboard/manage-users"
          element={
            <>
              <Helmet>
                <title>Manage Users | NestQuest</title>
              </Helmet>

              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/dashboard/manage-reviews"
          element={
            <>
              <Helmet>
                <title>Manage Reviews | NestQuest</title>
              </Helmet>

              <AdminRoute>
                <ManageReviews />
              </AdminRoute>
            </>
          }
        />
        <Route
          path="/dashboard/advertise-properties"
          element={
            <>
              <Helmet>
                <title>Advertise Properties | NestQuest</title>
              </Helmet>

              <AdminRoute>
                <AdvertiseProperty />
              </AdminRoute>
            </>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
