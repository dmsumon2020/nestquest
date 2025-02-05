import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";

const UserProfile = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user data based on email
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", loggedInUser?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/users/email/${loggedInUser.email}`
      );
      return response.data; // Assuming response.data contains the user object
    },

    enabled: !!loggedInUser?.email, // Ensure query runs only if email exists
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) {
    return <p>Failed to fetch user data. Please try again later.</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <img
        src={user[0]?.image}
        alt={`${user[0]?.user}'s profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-medium text-gray-800">{user[0]?.user}</h3>
      <p className="text-gray-600">{user[0]?.email}</p>
      <p className="text-gray-500 text-sm">Role: {user[0]?.role}</p>
    </div>
  );
};

export default UserProfile;
