import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch properties using TanStack Query
  const {
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await axiosSecure.get("/properties");
      return response.data;
    },
  });

  // Mutation for updating the verification status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.put(`/properties/verify/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]); // Refresh data
    },
  });

  const handleUpdateStatus = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to mark this property as "${status}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    });

    if (result.isConfirmed) {
      mutation.mutate(
        { id, status },
        {
          onSuccess: () => {
            Swal.fire({
              title: "Success!",
              text: `The property has been marked as "${status}".`,
              icon: "success",
            });
          },
          onError: (error) => {
            Swal.fire({
              title: "Error!",
              text: "There was an issue updating the status. Please try again.",
              icon: "error",
            });
            console.error("Error updating status:", error);
          },
        }
      );
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );
  if (error) return <p>Error loading properties: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-5xl font-thin text-center pb-10 dark:text-white">
        Manage Properties
      </h2>
      <table className="table-auto w-full border-collapse border border-primaryColor text-left text-s bg-white">
        <thead>
          <tr className="bg-primaryColor">
            <th className="border border-primaryColor border-r-white px-4 py-2 text-white">
              Title
            </th>
            <th className="border border-primaryColor border-r-white px-4 py-2 text-white">
              Location
            </th>
            <th className="border border-primaryColor border-r-white px-4 py-2 text-white">
              Agent Name
            </th>
            <th className="border border-primaryColor border-r-white px-4 py-2 text-white">
              Agent Email
            </th>
            <th className="border border-primaryColor border-r-white px-4 py-2 text-white">
              Price Range
            </th>
            <th className="border border-primaryColor px-4 py-2 border-r-white text-white">
              Verification Status
            </th>
            <th className="border border-primaryColor px-4 py-2 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {property.title}
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {property.location}
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {property.agentName}
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {property.agentEmail}
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                ${property.minimumPrice} - ${property.maximumPrice}
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {property.verificationStatus.charAt(0).toUpperCase() +
                  property.verificationStatus.slice(1)}
              </td>
              <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                {property.verificationStatus === "pending" ? (
                  <>
                    <button
                      className="px-3 py-2 my-5 text-center text-primaryColor font-semibold rounded-lg border border-primaryColor hover:bg-primaryColor transition-all duration-300 ease-in-out hover:text-white"
                      onClick={() =>
                        handleUpdateStatus(property._id, "verified")
                      }
                    >
                      Verify
                    </button>
                    <button
                      className="px-3 py-2 my-5 ml-2 text-center text-primaryColor font-semibold rounded-lg border border-primaryColor hover:bg-primaryColor transition-all duration-300 ease-in-out hover:text-white"
                      onClick={() =>
                        handleUpdateStatus(property._id, "rejected")
                      }
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span
                    className={`${
                      property.verificationStatus === "verified"
                        ? "text-[#009868]"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {property.verificationStatus.charAt(0).toUpperCase() +
                      property.verificationStatus.slice(1)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
