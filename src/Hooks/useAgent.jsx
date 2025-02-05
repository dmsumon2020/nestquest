import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAgent = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAgent, isPending: isAgentLoading } = useQuery({
    queryKey: [user?.email, "isAgent"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/agent/${user.email}`);

      return res.data?.admin;
    },
  });

  return [isAgent, isAgentLoading];
};

export default useAgent;
