import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/role/${email}`);
      return response.data.role;
    },
    enabled: !!email,
  });

  return { role, isLoading, isError, refetch };
};

export default useUserRole;
