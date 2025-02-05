import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";

const MakeAnOffer = () => {
  const location = useLocation();
  const property = location.state;
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [offerAmount, setOfferAmount] = useState("");
  const [buyingDate, setBuyingDate] = useState("");

  // Set the current date as default buying date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setBuyingDate(today);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  const { mutate } = useMutation({
    mutationFn: async (offerData) => {
      const response = await axiosSecure.post("/propertyBought", offerData, {
        headers: {
          "X-User-Email": user?.email,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Offer Submitted",
        text: "Your offer has been successfully submitted to the agent.",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was an error submitting your offer. Please try again later.",
      });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      offerAmount < property.minimumPrice ||
      offerAmount > property.maximumPrice
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Offer",
        text: `Please enter an amount between $${property.minimumPrice.toLocaleString()} and $${property.maximumPrice.toLocaleString()}.`,
      });
      return;
    }

    // Prepare the data to send to the backend
    const offerData = {
      propertyId: property?.propertyId,
      propertyName: property?.title,
      propertyLocation: property?.location,
      propertyImage: property?.image,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
      offeredAmount: offerAmount,
      buyingDate,
      agentEmail: property?.agentEmail,
      status: "pending",
    };

    // Trigger mutation to submit the offer
    mutate(offerData);
  };

  return (
    <div className="mt-6">
      <h2 className="text-3xl font-bold text-center mb-6">Make an Offer</h2>
      <form
        onSubmit={handleFormSubmit}
        className="bg-white md:p-6 rounded shadow"
      >
        {/* Property details (readonly fields) */}
        <div className="mb-4">
          <label className="block font-medium">Property Title</label>
          <input
            type="text"
            value={property.title}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Property Location</label>
          <input
            type="text"
            value={property.location}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Agent Name</label>
          <input
            type="text"
            value={property.agentName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Offer Amount */}
        <div className="mb-4">
          <label className="block font-medium">Offer Amount</label>
          <input
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={`Enter an amount between $${property.minimumPrice.toLocaleString()} and $${property.maximumPrice.toLocaleString()}`}
          />
        </div>

        {/* Buyer Email */}
        <div className="mb-4">
          <label className="block font-medium">Buyer Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Buyer Name */}
        <div className="mb-4">
          <label className="block font-medium">Buyer Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Buying Date */}
        <div className="mb-4">
          <label className="block font-medium">Buying Date</label>
          <input
            type="date"
            value={buyingDate}
            onChange={(e) => setBuyingDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Offer
        </button>
      </form>
    </div>
  );
};

export default MakeAnOffer;
