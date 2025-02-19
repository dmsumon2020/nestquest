import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useDebounce from "../../Hooks/useDebounce";
import { useState } from "react";
import AllPropertiesCard from "./AllPropertiesCard";
import { GridLoader } from "react-spinners";
import useAuth from "../../Hooks/useAuth";

const AllProperties = ({ searchTerm }) => {
  const axiosSecure = useAxiosSecure();
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term
  const [sortOrder, setSortOrder] = useState("");
  const { user } = useAuth();

  // Fetch data using React Query
  const {
    data: properties = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProperties", debouncedSearchTerm],
    queryFn: async () => {
      const response = await axiosSecure.get("/properties/verified", {
        params: { location: debouncedSearchTerm },
        headers: {
          "X-User-Email": user?.email,
        },
      });
      return response.data;
    },
  });

  // Conditionally sort the properties only if sortOrder is set
  const sortedProperties =
    sortOrder === ""
      ? properties
      : [...properties].sort((a, b) => {
          const rangeA = a.maximumPrice - a.minimumPrice;
          const rangeB = b.maximumPrice - b.minimumPrice;

          return sortOrder === "ascending" ? rangeA - rangeB : rangeB - rangeA;
        });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) return <div>Error loading data!</div>;

  return (
    <section className="bg-[#F7F7F7] py-10 dark:bg-gray-800">
      <div className="section-wrap w-11/12 lg:w-9/12 mx-auto">
        {/* section header */}

        {/* Sort options */}
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">
            Sort by Price Range:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select an option</option> {/* Default option */}
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>

        {/* Check if properties array is empty */}
        {sortedProperties.length === 0 ? (
          <div className="text-center text-lg text-gray-600 mt-4">
            No items found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProperties.map((property) => (
              <AllPropertiesCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProperties;
