import { useNavigate } from "react-router";
import usePropertiesBought from "../../../Hooks/usePropertiesBought";
import { GridLoader } from "react-spinners";

const PropertyBought = () => {
  const [properties, isLoading, fetchError] = usePropertiesBought();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (fetchError) return <div>Error loading data!</div>;

  if (properties.length === 0) {
    return <p>You have not bought any property yet</p>;
  }

  const handlePaymentRedirect = (propertyId, offeredAmount) => {
    navigate("/dashboard/payment", {
      state: { propertyId, offeredAmount },
    });
  };

  return (
    <div className="w-11/12 md:w-9/12 mx-auto mt-6">
      <h2 className="text-5xl font-thin text-center pb-10">
        Your Bought Properties
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded shadow p-4 bg-white flex flex-col"
          >
            {/* Property Image */}
            <img
              src={property.propertyImage}
              alt={property.propertyName}
              className="w-full h-40 object-cover rounded mb-4"
            />

            {/* Property Information */}
            <h3 className="text-lg font-bold mb-2">{property.propertyName}</h3>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {property.propertyLocation}
            </p>
            <p>
              <span className="font-semibold">Agent Name:</span>{" "}
              {property.agentEmail}
            </p>
            <p>
              <span className="font-semibold">Offered Amount:</span> $
              {parseInt(property.offeredAmount).toLocaleString()}
            </p>
            {/* <p className="capitalize">
              <span className="font-semibold">Status:</span> {property.status}
            </p> */}
            {/* Conditional Status Display */}
            <p
              className={`capitalize font-semibold ${
                property.status === "pending"
                  ? "text-orange-500"
                  : property.status === "accepted"
                  ? "text-green-500"
                  : property.status === "rejected"
                  ? "text-red-500"
                  : property.status === "bought"
                  ? "text-primaryColor"
                  : ""
              }`}
            >
              <span>Status:</span> {property.status}
            </p>

            {/* Conditional Pay Button */}
            {property.status === "accepted" && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                onClick={() =>
                  handlePaymentRedirect(
                    property.propertyId,
                    property.offeredAmount
                  )
                }
              >
                Pay
              </button>
            )}
            {property.status === "bought" && (
              <p>Transaction ID : {property?.transactionId}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
