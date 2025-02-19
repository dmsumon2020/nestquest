import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user: loggedInUser } = useAuth();
  const loggedInUserEmail = loggedInUser?.email;
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch users using TanStack Query
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  // Mutation for making a user an admin
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.patch(
        `/users/admin/${id}`,
        {},
        {
          headers: {
            "X-User-Email": loggedInUserEmail, // Send email as a custom header
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to grant Admin privileges to this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Success!",
              text: "The user has been made an Admin.",
              icon: "success",
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user role. Please try again.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  // Mutation for making a user an agent
  const makeAgentMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.patch(
        `/users/agent/${id}`,
        {},
        {
          headers: {
            "X-User-Email": loggedInUserEmail,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleMakeAgent = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to grant Agent privileges to this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Agent!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAgentMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Success!",
              text: "The user has been made an Agent.",
              icon: "success",
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user role. Please try again.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  // Mutation for marking a user as fraud
  const makeFraudMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.patch(
        `/users/fraud/${id}`,
        {},
        {
          headers: {
            "X-User-Email": loggedInUserEmail,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleMakeFraud = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this user as fraud.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as Fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        makeFraudMutation.mutate(id, {
          onSuccess: () => {
            Swal.fire({
              title: "Success!",
              text: "The user has been marked as fraud.",
              icon: "success",
            });
          },
          onError: () => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user status. Please try again.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  // Mutation for deleting a user
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/users/delete/${id}`, {
        headers: {
          "X-User-Email": loggedInUserEmail,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate users cache so the user list refreshes after deletion
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleDeleteUser = (id) => {
    // Confirm the deletion action
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-5xl font-thin text-center pb-10 dark:text-white">
        Manage Users
      </h2>
      <table className="table-auto w-full border-collapse border border-primaryColor text-left text-sm bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-primaryColor px-4 py-2 border-r-white bg-primaryColor text-white">
              User Name
            </th>
            <th className="border border-primaryColor px-4 py-2 border-r-white bg-primaryColor text-white">
              Email
            </th>
            <th className="border border-primaryColor px-4 py-2  bg-primaryColor text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.image}
                    alt={user.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.user}</span>
                </div>
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {user.email}
              </td>
              <td className="border border-primaryColor px-4 py-2 space-y-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {user.fraud === "yes" ? (
                  <p className="text-red-500 font-bold inline-block mr-2">
                    Fraud
                  </p>
                ) : (
                  <>
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className={`px-3 py-2 text-center text-primaryColor font-semibold rounded-lg border border-primaryColor hover:bg-primaryColor transition-all duration-300 ease-in-out hover:text-white ${
                        user.role === "admin"
                          ? "bg-primaryColor text-white cursor-not-allowed"
                          : ""
                      }`}
                      disabled={user.role === "admin"}
                    >
                      {user.role === "admin" ? "Already Admin" : "Make Admin"}
                    </button>
                    <button
                      onClick={() => handleMakeAgent(user._id)}
                      className={`px-3 py-2 ml-2 text-center text-[#009868] font-semibold rounded-lg border border-[#009868] hover:bg-[#009868] transition-all duration-300 ease-in-out hover:text-white ${
                        user.role === "agent"
                          ? "bg-[#009868] text-white cursor-not-allowed"
                          : ""
                      }`}
                      disabled={user.role === "agent"}
                    >
                      {user.role === "agent" ? "Already Agent" : "Make Agent"}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-2 ml-2 text-center text-primaryColor font-semibold rounded-lg border border-primaryColor hover:bg-primaryColor transition-all duration-300 ease-in-out hover:text-white"
                    >
                      Delete User
                    </button>
                    {user.role === "agent" && (
                      <button
                        onClick={() => handleMakeFraud(user._id)}
                        className="px-3 py-2 ml-2 text-center text-[#009868] font-semibold rounded-lg border border-[#009868] hover:bg-[#009868] transition-all duration-300 ease-in-out hover:text-white"
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
