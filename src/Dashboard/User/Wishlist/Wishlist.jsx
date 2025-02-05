import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useWishlist from "../../../Hooks/useWishlist";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { GridLoader } from "react-spinners";

const Wishlist = () => {
  const [wishlist, refetch] = useWishlist();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );
  const userId = user?.email;

  // Mutation to remove a property from the wishlist
  const mutation = useMutation({
    mutationFn: async ({ userId, propertyId }) => {
      const response = await axiosSecure.delete(
        `/wishlist/${userId}/${propertyId}`,
        {
          headers: {
            "X-User-Email": user?.email,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]); // Refetch wishlist data
      refetch(); // Trigger refetch after removing from wishlist
      Swal.fire({
        icon: "success",
        title: "Removed from Wishlist!",
        text: "The property has been successfully removed from your wishlist.",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error removing the property from the wishlist.",
      });
    },
  });

  const handleRemoveFromWishlist = (propertyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this property from your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ userId, propertyId });
      }
    });
  };

  const handleMakeAnOffer = (property) => {
    navigate("/dashboard/make-an-offer", { state: property });
  };

  if (!wishlist[0]?.properties || wishlist[0]?.properties.length === 0) {
    return <div>No items in your wishlist!</div>;
  }
  return (
    <div className="w-11/12 md:w-9/12 mx-auto mt-6">
      <h2 className="text-5xl font-thin text-center pb-10">Your Wishlist</h2>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
        {wishlist[0]?.properties?.map((property) => (
          <div
            key={property.propertyId}
            className="border p-4 rounded shadow bg-white relative"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <div className="flex items-center mt-2">
              <img
                src={property.agentImage}
                alt={property.agentName}
                className="w-10 h-10 rounded-full mr-2"
              />
              <p className="text-sm text-gray-800">{property.agentName}</p>
            </div>
            <p
              className={`text-xs font-semibold inline-block py-1 px-3 ${
                property.verificationStatus === "verified"
                  ? "bg-[#7d2eff33] text-[#7d2eff]"
                  : "text-red-600"
              } mt-2`}
            >
              <span>{property.verificationStatus}</span>
            </p>
            <p className="text-gray-800 mt-2 font-medium">
              Price Range: ${property.minimumPrice.toLocaleString()} - $
              {property.maximumPrice.toLocaleString()}
            </p>

            <div className="mt-4 flex flex-col md:flex-row gap-2 items-center">
              <button
                onClick={() => handleMakeAnOffer(property)}
                className="bg-primaryColor text-white px-4 py-2 rounded  transition-bg duration-300 ease-in-out hover:bg-primaryColorHover"
              >
                Make an Offer
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(property.propertyId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
