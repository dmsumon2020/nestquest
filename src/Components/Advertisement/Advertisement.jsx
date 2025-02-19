import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PropertyCard from "../PropertyCard/PropertyCard";
import SectionHeader from "../SectionHeader/SectionHeader";
import { GridLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

const Advertisement = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch data using React Query
  const {
    data: properties,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProperties"],
    queryFn: async () => {
      const response = await axiosPublic.get("/properties/featured");
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) return <div>Error loading data!</div>;

  return (
    <section className="bg-sectionBgColor dark:bg-gray-800 py-16 md:py-32">
      <div className="section-wrap w-11/12 md:w-9/12 mx-auto">
        <SectionHeader
          heading="Advertised Properties"
          subHeading="Explore over 2000 properties for rent, listed by the top agents nationwide, offering options for every lifestyle and budget."
        />
        <Fade triggerOnce={true} delay={300}>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Advertisement;
