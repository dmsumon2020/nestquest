import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useWishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/wishlist/email/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });
  return [wishlist, refetch];
};

export default useWishlist;
