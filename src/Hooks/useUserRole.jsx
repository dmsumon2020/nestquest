import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const {
    data: role,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      if (!email) return null; // return null or undefined when no email is provided
      // const response = await axiosSecure.get(`/users/role/${email}`);
      const response = await axiosPublic.get(`/user-role?email=${email}`);
      return response.data.role;
    },
    enabled: !!email, // Ensures the query runs only when email is truthy
  });

  return { role, isLoading, isError, refetch };
};

export default useUserRole;
