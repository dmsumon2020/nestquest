import { IoBedOutline } from "react-icons/io5";
import { LuBath, LuTriangleRight } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router";

const AllPropertiesCard = ({ property }) => {
  return (
    <div className="bg-white shadow-md dark:bg-[#323e4f]">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover rounded-t-md"
      />
      <div className="p-4">
        <div>
          {property.featured === "yes" && (
            <span className="text-primaryColor text-xs bg-[#EBF9FF] py-1 px-3 mr-2 dark:bg-[#a4a4a4] dark:text-white">
              Featured
            </span>
          )}{" "}
          <span className="text-primaryColor text-xs bg-[#EBF9FF] py-1 px-3 mr-2 dark:bg-[#a4a4a4] dark:text-white">
            {property.propertyType}
          </span>{" "}
          {property.verificationStatus === "verified" && (
            <span className="text-[#009868] text-xs bg-[#E5F5EF] py-1 px-3 mr-2 dark:bg-[#a4a4a4] dark:text-white">
              Verified
            </span>
          )}{" "}
        </div>
        <Link to={`/property-details/${property._id}`}>
          <h3 className="text-xl  pt-5 pb-1 transition-colors duration-300 ease-in-out hover:text-primaryColor dark:text-white">
            {property.title}
          </h3>
        </Link>
        <p className="text-sm flex flex-row items-center gap-2 mb-8 dark:text-[#ccc]">
          <MdLocationPin />
          {property.location}
        </p>

        <div className="text-sm flex flex-row items-center gap-2 dark:text-[#ccc]">
          <p className="flex flex-row items-center gap-3">
            <IoBedOutline />
            {property.bedrooms} Beds
          </p>
          <p className="flex flex-row items-center gap-3">
            <LuBath />
            {property.bathroom} Bathrooms
          </p>
          <p className="flex flex-row items-center gap-3">
            <LuTriangleRight />
            {property.area} sq. ft.
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 mt-10">
          <p className="text-sm text-black dark:text-[#ccc]">
            Agent: {property.agentName}
          </p>
          <img
            className="w-[30px] h-[30px] object-cover rounded-full"
            src={property.agentImage}
            alt={property.agentName}
          />
        </div>

        <p className="text-xl font-bold text-[#08AEEB] mt-9 pt-4 border-t border-t-[#eee]">
          <Link
            to={`/property-details/${property._id}`}
            className="transition-colors duration-300 ease-in-out hover:text-black"
          >
            Price: ${property.minimumPrice.toLocaleString()} - $
            {property.maximumPrice.toLocaleString()}
          </Link>
        </p>
        <div>
          <Link
            to={`/property-details/${property._id}`}
            className="px-6 py-3 my-5 block text-center text-primaryColor font-semibold rounded-lg border border-primaryColor hover:bg-primaryColor transition-all duration-300 ease-in-out hover:text-white"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllPropertiesCard;
