import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePropertiesBought = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: properties = [],
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["purchasedProperties", user?.email],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get(
          `/offeredCollection/${user.email}`
        );
        return response.data; // Return the fetched data
      } catch (error) {
        if (error.response?.status === 404) {
          // Return an empty array if no data is found
          return [];
        }
        // Re-throw other errors to let React Query handle them
        throw error;
      }
    },
    enabled: !!user?.email, // Ensure the query only runs if email is available
  });

  return [properties, isLoading, fetchError];
};

export default usePropertiesBought;
