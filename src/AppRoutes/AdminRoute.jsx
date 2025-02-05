import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";
import { GridLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading, isError } = useUserRole(user?.email);
  const location = useLocation();

  if (loading || isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) return <p>Error fetching user role</p>;

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
