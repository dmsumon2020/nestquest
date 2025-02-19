import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const AddedProperty = () => {
  const { user, loading } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch properties function
  const fetchProperties = async (email) => {
    const response = await axiosSecure.get(`/properties/email/${email}`);
    return response.data;
  };

  // Fetch user info function
  const fetchUserInfo = async (email) => {
    const response = await axiosSecure.get(`/users/email/${email}`);
    return response.data;
  };

  // React Query to fetch properties
  const {
    data: properties,
    isLoading: isPropertiesLoading,
    error: propertiesError,
  } = useQuery({
    queryKey: ["properties", email],
    queryFn: () => fetchProperties(email),
  });

  // React Query to fetch user info
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    error: userInfoError,
  } = useQuery({
    queryKey: ["userInfo", email],
    queryFn: () => fetchUserInfo(email),
  });

  // Mutation to delete a property
  const deletePropertyMutation = useMutation({
    mutationFn: async (propertyId) => {
      const response = await axiosSecure.delete(
        `/properties/delete/${propertyId}`
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the query to refresh the list
      queryClient.invalidateQueries(["properties", email]);
    },
    onError: (error) => {
      console.error("Failed to delete property:", error);
    },
  });

  // Handle delete button click
  const handleDelete = (propertyId) => {
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
        deletePropertyMutation.mutate(propertyId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isPropertiesLoading || isUserInfoLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (propertiesError || userInfoError)
    return (
      <div>
        Error fetching data:{" "}
        {propertiesError?.message || userInfoError?.message}
      </div>
    );

  const isFraudUser = userInfo[0]?.fraud === "yes";

  return (
    <div>
      <h2 className="text-5xl font-thin text-center pb-10 dark:text-white">
        My Added Properties
      </h2>

      {properties.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-white">
          <p className="text-2xl ">You haven't added any properties yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="border rounded-lg shadow-md p-4 bg-white dark:bg-[#323e4f] dark:border-gray-800"
            >
              {/* Property Image */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Property Title */}
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {property.title}
              </h3>

              {/* Location */}
              <p className="text-gray-600 mb-2 dark:text-[#ccc]">
                {property.location}
              </p>

              {/* Agent Information */}
              <div className="flex items-center mb-4">
                <img
                  src={property?.agentImage}
                  alt={property?.agentName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-sm text-gray-800 dark:text-[#ccc]">
                  {property.agentName}
                </span>
              </div>

              {/* Verification Status */}
              <p
                className={`text-sm font-semibold mb-2 ${
                  property.verificationStatus === "verified"
                    ? "text-green-500"
                    : property.verificationStatus === "rejected"
                    ? "text-red-500"
                    : "text-orange-500" // Pending state
                }`}
              >
                {property.verificationStatus === "verified" && "Verified"}
                {property.verificationStatus === "pending" && "Pending"}
                {property.verificationStatus === "rejected" && "Rejected"}
              </p>

              {/* Price Range */}
              <p className="text-gray-800 dark:text-[#ccc]">
                <span className="font-medium">Price Range: </span>$
                {property.minimumPrice} - ${property.maximumPrice}
              </p>

              {/* Update Button - Only show if fraud is "no" */}
              {!isFraudUser && property.verificationStatus !== "rejected" && (
                <button
                  className="mt-4 bg-primaryColor text-white px-4 py-2 rounded hover:bg-primaryColorHover mr-2"
                  onClick={() =>
                    navigate(`/dashboard/update-property/${property._id}`, {
                      state: property,
                    })
                  }
                >
                  Update
                </button>
              )}

              {/* Delete Button */}
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(property._id)}
                disabled={deletePropertyMutation.isLoading}
              >
                {deletePropertyMutation.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddedProperty;
