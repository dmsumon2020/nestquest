import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch verified properties
  const {
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/properties?verificationStatus=verified"
      );
      return res.data;
    },
  });

  // Mutation to update the featured status
  const toggleFeaturedStatus = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      await axiosSecure.put(`/properties/featured/${id}`, {
        status: newStatus,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["verifiedProperties"]);
    },
  });

  // Handle loading and error states

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) return <p>Error fetching properties: {error.message}</p>;

  const handleToggleFeaturedStatus = (property) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        property.featured === "yes" ? "remove" : "set"
      } this property as featured.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        toggleFeaturedStatus.mutate(
          {
            id: property._id,
            newStatus: property.featured === "yes" ? "no" : "yes",
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Success!",
                text: `Property has been ${
                  property.featured === "yes" ? "removed from" : "added to"
                } featured.`,
                icon: "success",
              });
            },
            onError: () => {
              Swal.fire({
                title: "Error!",
                text: "Failed to update the featured status. Please try again.",
                icon: "error",
              });
            },
          }
        );
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-5xl font-thin text-center pb-10 dark:text-white">
        Advertise Properties
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-primaryColor w-full bg-white">
          <thead>
            <tr>
              <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2">
                Property Image
              </th>
              <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2">
                Title
              </th>
              <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2">
                Agent Name
              </th>
              <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2">
                Price Range
              </th>
              <th className="border bg-primaryColor text-white border-primaryColor border-r-white px-4 py-2">
                Verification Status
              </th>
              <th className="border bg-primaryColor text-white border-primaryColor px-4 py-2">
                Advertise?
              </th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                  {property.title}
                </td>
                <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                  {property.agentName}
                </td>
                <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                  ${property.minimumPrice.toLocaleString()} - $
                  {property.maximumPrice.toLocaleString()}
                </td>
                <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] dark:text-[#ccc]">
                  {property.verificationStatus}
                </td>
                <td className="border border-primaryColor px-4 py-2 dark:bg-[#323e4f] ">
                  <button
                    onClick={() => handleToggleFeaturedStatus(property)}
                    className={`px-3 py-2 text-center font-semibold rounded-lg border  transition-all duration-300 ease-in-out ${
                      property.featured === "yes"
                        ? "text-[#009868] border-[#009868] hover:bg-[#009868] hover:text-white"
                        : "text-primaryColor border-primaryColor hover:bg-primaryColor hover:text-white"
                    }`}
                  >
                    {property.featured === "yes" ? "Yes" : "No"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
