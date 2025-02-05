import { GridLoader } from "react-spinners";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";

const DashboardHome = () => {
  const { user, loading } = useAuth();
  const { role, isLoading, isError } = useUserRole(user?.email);

  if (loading || isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) return <p>Error fetching user role</p>;

  return (
    <div className="p-8">
      <h2 className="text-5xl font-thin">
        Welcome to <span className="font-bold capitalize">{role}</span>{" "}
        Dashboard : {user?.displayName}
      </h2>
      <p className="mt-10 text-xl font-bold text-black">You role is : {role}</p>
    </div>
  );
};

export default DashboardHome;
