import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { GridLoader } from "react-spinners";

const PropertyReviews = ({ propertyId }) => {
  const axiosPublic = useAxiosPublic();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["propertyReviews", propertyId],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/reviews?propertyID=${propertyId}`
      );
      return response.data;
    },
    enabled: !!propertyId, // Fetch only if propertyId exists
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (error) return <div>Error loading reviews!</div>;
  if (!reviews || reviews.length === 0)
    return <div>No reviews available for this property.</div>;

  return (
    <section className="mt-8">
      <h3 className="text-xl font-bold mb-4 dark:text-white">Reviews</h3>
      <div className="space-y-4 ">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border rounded shadow-sm bg-gray-50 dark:bg-[#323e4f] dark:border-[#323e4f]"
          >
            <div className="flex items-center mb-2">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium dark:text-white">
                  {review.reviewerName}
                </p>
                <p className="text-sm text-gray-500 dark:text-[#ccc]">
                  {review.propertyTitle}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-[#ccc]">
              {review.reviewDescription}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyReviews;
