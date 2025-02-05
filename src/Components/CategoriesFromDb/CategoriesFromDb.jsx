import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router";
import SectionHeader from "../SectionHeader/SectionHeader";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { GridLoader } from "react-spinners";

const CategoriesFromDb = () => {
  const axiosPublic = useAxiosPublic();

  const fetchCategories = async () => {
    const response = await axiosPublic.get("/categories");
    return response.data;
  };

  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 6 * 60 * 60 * 1000,
    cacheTime: 6 * 60 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <Fade triggerOnce={true} delay={300}>
        <section className="w-11/12 md:w-9/12 mx-auto py-16 md:py-32">
          <SectionHeader
            heading="Explore The Neightborhood​"
            subHeading="There are various property options available, each designed to help you create a fully customized and polished site."
          />

          <div className="categories-wrap grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className={`category-card relative group ${
                  index === 0
                    ? "md:col-span-6 md:row-span-1"
                    : index === 1
                    ? "md:col-span-3 md:row-span-1"
                    : index === 2
                    ? "md:col-span-3 md:row-span-2"
                    : index === 3
                    ? "md:col-span-3 md:row-span-1"
                    : "md:col-span-6 md:row-span-1"
                }`}
              >
                <div className="relative w-full h-full relative">
                  <Link
                    // to={`/category/${category?.name}`}
                    className="block w-full h-full relative before:content-[''] before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(0,0,0,0.5)100%)] before:z-10 before:transition-opacity before:duration-300 hover:before:opacity-0"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={category?.photo}
                      alt={category?.name}
                    />
                    <div className="category-info absolute bottom-0 left-0 w-full px-6 py-4 z-20 text-white font-bold">
                      <p className="capitalize font-thin text-white text-5xl ">
                        {category?.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Fade>
    </>
  );
};

export default CategoriesFromDb;
