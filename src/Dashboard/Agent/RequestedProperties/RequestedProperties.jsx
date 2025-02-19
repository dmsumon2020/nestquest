import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const agentEmail = user?.email;

  // Function to load all requested properties
  const loadRequestedProperties = async (agentEmail) => {
    const response = await axiosSecure.get(`/offers/agentEmail/${agentEmail}`);
    return response.data;
  };

  // Fetch offers using the agent email
  const {
    data: offers = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["offers", agentEmail],
    queryFn: () => loadRequestedProperties(agentEmail),
  });

  // Function to handle status update
  const handleStatusChange = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "Do you want to change the status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#08AEEB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.put(`/offers/${id}`, { status: newStatus });
        refetch(); // Refresh the offers after status change
        Swal.fire({
          title: "Changed!",
          text: "Status has been changed.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an issue updating the status.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) {
    return <p>Failed to load requested properties.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-5xl font-thin text-center pb-10 dark:text-white">
        Requested Properties
      </h2>
      <div className="overflow-x-auto">
        {offers.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-2xl">You have no offers yet.</p>
          </div>
        ) : (
          <table className="table-auto border-collapse border border-primaryColor w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2 text-left">
                  Property Title
                </th>
                <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2 text-left">
                  Location
                </th>
                <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2 text-left">
                  Buyer Name
                </th>
                <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2 text-left">
                  Buyer Email
                </th>
                <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2 text-left">
                  Offered Price
                </th>
                <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2 text-left">
                  Status
                </th>
                <th className="border bg-primaryColor text-white border-primaryColor px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer._id}>
                  <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                    {offer.propertyName}
                  </td>
                  <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                    {offer.propertyLocation}
                  </td>
                  <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                    {offer.buyerName}
                  </td>
                  <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                    {offer.buyerEmail}
                  </td>
                  <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                    ${offer.offeredAmount}
                  </td>
                  <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                    {offer.status}
                  </td>
                  <td className="border border-primaryColor px-4 py-2 text-center dark:bg-[#323e4f] dark:text-[#ccc]">
                    {offer.status === "pending" ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                          onClick={() =>
                            handleStatusChange(offer._id, "accepted")
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() =>
                            handleStatusChange(offer._id, "rejected")
                          }
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500 italic">No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RequestedProperties;
