import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router";
import Swal from "sweetalert2"; // Import SweetAlert2
import useAuth from "../../Hooks/useAuth";
import useWishlist from "../../Hooks/useWishlist"; // Import your custom hook
import PropertyReviews from "../../Components/PropertyReviews/PropertyReviews";
import { useState } from "react";
import AddReviewModal from "../../Components/AddReviewModal/AddReviewModal";
import useUserRole from "../../Hooks/useUserRole";
import { MdLocationPin, MdOutlineCategory } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { LuBath, LuTriangleRight } from "react-icons/lu";
import { PiGarageLight } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { GridLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();

  const {
    role,
    isLoading: isLoadingUserRole,
    isError,
  } = useUserRole(user?.email);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // for modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch property details
  const {
    data: property,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["propertyDetails", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/property/${id}`, {
        headers: {
          "X-User-Email": user?.email,
        },
      });
      return response.data;
    },
    enabled: !!id, // Ensures the query runs only if 'id' is truthy
  });

  // Fetch the user's wishlist using the custom hook
  const [wishlist, refetchWishlist] = useWishlist();

  // Mutation to add property to wishlist
  const mutation = useMutation({
    mutationFn: async (wishlistData) => {
      const response = await axiosSecure.post("/wishlist", wishlistData, {
        headers: {
          "X-User-Email": user?.email,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]); // Refetch wishlist data
      refetchWishlist(); // Trigger refetch after adding to wishlist
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist!",
        text: "The property has been successfully added to your wishlist.",
      }); // Success alert
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error adding the property to the wishlist.",
      }); // Error alert
    },
  });

  const handleAddToWishlist = () => {
    if (role === "agent" || role === "admin") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `You are an ${role}, you can't buy or add to wish list any items`,
      }); // Error alert
    }

    const wishlistData = {
      userId: user.email,
      propertyId: property._id,
      propertyData: {
        image: property.image,
        title: property.title,
        location: property.location,
        agentName: property.agentName,
        agentImage: property.agentImage,
        agentEmail: property.agentEmail,
        verificationStatus: property.verificationStatus,
        minimumPrice: property.minimumPrice,
        maximumPrice: property.maximumPrice,
      },
    };

    mutation.mutate(wishlistData);
  };

  // Check if the property is already in the wishlist
  const isInWishlist = (wishlist[0]?.properties || []).some(
    (propertyItem) => propertyItem.propertyId === property?._id
  );

  if (isLoading || isLoadingUserRole || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error || isError)
    return (
      <div>
        Error loading property details!
        {error?.message && <p>{error.message}</p>}
      </div>
    );

  return (
    <section className="bg-[#F7F7F7] dark:bg-gray-800">
      <div className="details-header w-11/12 md:w-9/12 mx-auto ">
        <h2 className="text-4xl text-headingColor capitalize mb-4 pt-16 dark:text-white">
          {property.title}
        </h2>
        <div className="property-labels mt-2 mb-10 ">
          {property.featured === "yes" && (
            <span className="py-1 px-3 bg-primaryColor text-white uppercase text-xs font-medium mr-2">
              Featured
            </span>
          )}
          <span className="py-1 px-3 bg-[#565657] text-white uppercase text-xs font-medium mr-2">
            {property.propertyType}
          </span>
          <span className="py-1 px-3 bg-[#77c720] text-white uppercase text-xs font-medium">
            {property.verificationStatus}
          </span>
        </div>
        <address className="flex flex-row items-center gap-2 text-[#222222] font-light text-xl dark:text-white">
          <MdLocationPin />
          <span>{property.location}</span>
        </address>
      </div>
      <div className="w-11/12 md:w-9/12 mx-auto py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <Fade triggerOnce={true} delay={300}>
            <div className="">
              <img src={property.image} alt="" className="w-full mb-4" />
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={400}>
            <div className="facts px-5 md:px-10 py-10  bg-white mt-8 text-headingColor text-xl dark:bg-[#323e4f] ">
              <h2 className="dark:text-white">Facts and Features </h2>

              <div className="text-[#6D7881] py-10 dark:text-white">
                <div className="flex flex-col md:flex-row items-center  justify-around gap-10">
                  <p className="flex flex-col  items-center gap-3">
                    <MdOutlineCategory className="text-xl md:text-4xl" />
                    {property?.propertyType} Type
                  </p>
                  <p className="flex flex-col  items-center gap-3">
                    <IoBedOutline className="text-4xl" />
                    {property?.bedrooms || 0} Beds
                  </p>
                  <p className="flex flex-col  items-center gap-3">
                    <LuBath className="text-4xl" />
                    {property?.bathroom || 0} Bathrooms
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-around gap-10 mt-10">
                  <p className="flex flex-col items-center gap-3">
                    <PiGarageLight className="text-4xl" />
                    {property?.garage || 0} Garage
                  </p>
                  <p className="flex flex-col items-center gap-3">
                    <LuTriangleRight className="text-4xl" />
                    {property?.area || 700} sq. ft.
                  </p>
                  <p className="flex flex-col items-center gap-3">
                    <SlCalender className="text-4xl" />
                    {property?.yearBuilt || 2025} Year Built
                  </p>
                </div>
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={400}>
            <div className="facts px-5 md:px-10 py-10 bg-white mt-8 text-headingColor text-xl dark:bg-[#323e4f]">
              <h2 className="dark:text-white">Price Range </h2>
              <div className=" flex flex-row gap-10 items-center text-white bg-primaryColor border border-primaryColor px-5 md:px-10 py-10 mt-10 font-bold">
                <p className="font-bold">
                  Price Range: ${property.minimumPrice.toLocaleString()} - $
                  {property.maximumPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={400}>
            <div className="facts px-5 md:px-10 py-10 bg-white mt-8 text-headingColor dark:bg-[#323e4f]">
              <h2 className="text-xl dark:text-white">Description </h2>
              <p className="text-bodyColor font-light mt-10 dark:text-[#ccc]">
                {property?.description}
              </p>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={400}>
            <div className="facts px-5 md:px-10 py-10 bg-white mt-8 text-headingColor text-xl dark:bg-[#323e4f]">
              <h2 className="dark:text-white">Location </h2>
              <div className=" flex flex-row gap-10 items-center bg-[#E5F7FF] border border-primaryColor px-5 md:px-10 py-10 mt-10 font-bold">
                <p className="font-light">
                  <span className="font-bold">City :</span> {property?.city}
                </p>
                <p className="font-light">
                  <span className="font-bold">Address :</span>{" "}
                  {property?.location}
                </p>
              </div>
            </div>
          </Fade>
          <button
            onClick={handleAddToWishlist}
            className={`mt-4 px-4 py-2  text-white hover:bg-black ${
              mutation.isLoading || isInWishlist
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primaryColor"
            }`}
            disabled={mutation.isLoading || isInWishlist}
          >
            {mutation.isLoading
              ? "Adding..."
              : isInWishlist
              ? "Already in Wishlist"
              : "Add to Wishlist"}
          </button>

          {/* Include the PropertyReviews component */}
          <Fade triggerOnce={true} delay={400}>
            <PropertyReviews propertyId={property._id} />
          </Fade>
          {/* Modal Button */}
          <button
            onClick={handleOpenModal}
            className="px-6 py-2 bg-primaryColor text-white  hover:bg-black mt-4"
          >
            Add a Review
          </button>

          <AddReviewModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            propertyID={property._id}
            propertyTitle={property.title}
          />
        </div>

        {/* Right Sidebar */}

        <div className="w-full lg:w-3/12 bg-white px-8 md:px-10 py-8 dark:bg-[#323e4f]">
          <Fade triggerOnce={true} delay={400}>
            <div className="agent-info">
              <h3 className="text-lg font-semibold mb-3 text-center dark:text-white">
                Agent Information
              </h3>
              <img
                src={property.agentImage}
                alt={property.agentName}
                className="w-32 h-32  mt-4 object-cover mx-auto"
              />
              <p className="text-gray-800 mt-10 dark:text-white">
                Name: <span className="font-medium">{property.agentName}</span>
              </p>
              <p className="text-gray-600 mt-1 dark:text-white">
                Email: {property.agentEmail}
              </p>

              {property.verificationStatus && (
                <p className="mt-2 text-green-600 font-medium ">Verified</p>
              )}
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
