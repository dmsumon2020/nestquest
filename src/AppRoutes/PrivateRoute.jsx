import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import { GridLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  // If user is authenticated, render the children
  if (user) {
    return children;
  }

  // If user is not authenticated, redirect to sign-in page
  return <Navigate state={{ from: location }} to="/signin" replace />;
};

export default PrivateRoute;
