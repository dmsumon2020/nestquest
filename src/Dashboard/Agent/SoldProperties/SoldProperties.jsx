import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { GridLoader } from "react-spinners";

const SoldProperties = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  // Fetch sold properties using TanStack Query
  const {
    data: soldProperties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["soldProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/offeredCollection/forAgent/${user?.email}`
      );
      return res.data;
    },
  });

  // Calculate the total selling value
  const totalValue = useMemo(() => {
    return soldProperties.reduce(
      (sum, property) => sum + parseFloat(property.offeredAmount || 0),
      0
    );
  }, [soldProperties]);

  // Loading or error state

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) return <p>Error fetching sold properties: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-5xl font-thin text-center pb-10">Sold Properties</h2>
      <div className="overflow-x-auto">
        {soldProperties.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-2xl">You sold added any properties yet.</p>
          </div>
        ) : (
          <table className="bg-white table-auto border-collapse border border-primaryColor w-full">
            <thead>
              <tr>
                <th className="border text-white bg-primaryColor border-primaryColor border-r-white px-4 py-2">
                  #
                </th>
                <th className="border text-white bg-primaryColor border-primaryColor border-r-white px-4 py-2">
                  Property Title
                </th>
                <th className="border text-white bg-primaryColor border-primaryColor border-r-white px-4 py-2">
                  Property Location
                </th>
                <th className="border text-white bg-primaryColor border-primaryColor border-r-white px-4 py-2">
                  Buyer Name
                </th>
                <th className="border text-white bg-primaryColor border-primaryColor border-r-white px-4 py-2">
                  Buyer Email
                </th>
                <th className="border text-white bg-primaryColor border-primaryColor border-r-white px-4 px-4 py-2">
                  Paid
                </th>
                <th className="border text-white bg-primaryColor border-primaryColor px-4 py-2">
                  Sold Price
                </th>
              </tr>
            </thead>
            <tbody>
              {soldProperties.map((property, index) => (
                <tr key={property._id}>
                  <td className="border border-primaryColor px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-primaryColor px-4 py-2">
                    {property.propertyName}
                  </td>
                  <td className="border border-primaryColor px-4 py-2">
                    {property.propertyLocation}
                  </td>
                  <td className="border border-primaryColor px-4 py-2">
                    {property.buyerName}
                  </td>
                  <td className="border border-primaryColor px-4 py-2">
                    {property.buyerEmail}
                  </td>
                  <td className="border border-primaryColor px-4 py-2">
                    {property.status === "bought" ? "Yes" : "No"}
                  </td>
                  <td className="border border-primaryColor px-4 py-2">
                    ${parseFloat(property.offeredAmount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="6"
                  className="border border-primaryColor px-4 py-2 font-bold text-right"
                >
                  Total Value:
                </td>
                <td className="border border-primaryColor px-4 py-2 font-bold">
                  ${totalValue.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
};

export default SoldProperties;
