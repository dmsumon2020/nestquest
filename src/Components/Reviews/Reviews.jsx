import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ReviewCard from "../ReviewCard/ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import SectionHeader from "../SectionHeader/SectionHeader";
import { GridLoader } from "react-spinners";
import { Fade } from "react-awesome-reveal";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch data using React Query
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosPublic.get("/reviews");
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) return <div>Error loading reviews!</div>;

  return (
    <section className="bg-sectionBgColor py-16 md:py-32 dark:bg-gray-800">
      <Fade triggerOnce={true} delay={300}>
        <div className="w-11/12 md:w-9/12 mx-auto">
          <SectionHeader
            heading="Clients Testimonials"
            subHeading="Discover How We’ve Made a Difference: Client Testimonials and Success Stories"
          />
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop
            modules={[Pagination, Autoplay, Navigation]}
            wrapperClass="md:py-5"
            breakpoints={{
              768: {
                slidesPerView: 2, // 2 slides for medium devices
              },
              1024: {
                slidesPerView: 3, // 3 slides for large devices
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Fade>
    </section>
  );
};

export default Reviews;
