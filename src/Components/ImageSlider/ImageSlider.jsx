import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { GridLoader } from "react-spinners";

const ImageSlider = () => {
  // Call useAxiosPublic inside the component
  const axiosPublic = useAxiosPublic();

  // Fetch data using Tanstack Query and useAxiosPublic
  const { data, isLoading, error } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const response = await axiosPublic.get("/sliders");
      return response.data;
    },
    cacheTime: 21600000, // Cache the data for 6 hours (6 * 60 * 60 * 1000 ms)
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true, // Enable autoplay
    // autoplaySpeed: 3000, // Set autoplay speed to 3 seconds
    // pauseOnHover: false, // Prevent autoplay from stopping on hover
    arrows: false, // Hide next/previous buttons
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) {
    return <div>Error loading data!</div>;
  }

  return (
    <section className="bg-white dark:bg-gray-800">
      <Slider {...settings}>
        {data.map((slider, index) => (
          <div
            key={slider._id}
            className="relative w-full h-[300px] md:h-[600px]"
          >
            <img
              src={slider.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay div */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-around">
              <div className="slider-info w-11/12 md:w-6/12">
                <div className="slider-info">
                  <h3 className="text-xl md:text-5xl text-white font-bold md:font-normal">
                    {slider.title}
                  </h3>
                  <p className="text-sm md:text-lg text-white pt-1 md:pt-3 pb-1 md:pb-8">
                    {slider.info}
                  </p>
                  <p className="text-lg md:text-3xl text-white">
                    ${slider.minimumPrice} to ${slider.maximumPrice}
                  </p>
                </div>
                <div className="btn mt-2 md:mt-14">
                  <button className="px-3 py-1 md:px-6 md:py-3 text-white font-semibold rounded-lg border border-white hover:bg-white transition-all duration-300 ease-in-out hover:text-primaryColor">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ImageSlider;
