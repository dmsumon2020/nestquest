import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // Create a query client instance

  // Function to fetch reviews
  const fetchReviews = async () => {
    const response = await axiosSecure.get("/reviews");
    return response.data;
  };

  // Function to delete review
  const deleteReview = async (reviewId) => {
    const response = await axiosSecure.delete(
      `/admin/reviews/delete/${reviewId}`
    );
    return response.data;
  };

  // Fetch reviews with Tanstack Query
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  // Mutation for deleting a review
  const deleteReviewMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      // Invalidate the reviews query to refetch the data
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (error) => {
      console.error("Error deleting review:", error);
    },
  });

  // Loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );
  if (error) return <p>Error loading reviews</p>;

  // Handle delete button click
  const handleDelete = (id) => {
    // Trigger the delete mutation

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReviewMutation.mutate(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="text-5xl font-thin text-center pb-10">Manage Reviews</h2>
      <div className="reviews-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="review-card bg-white rounded shadow-md p-8 hover:shadow-lg flex flex-col justify-center items-center"
          >
            <div className="reviewer-info">
              <img
                src={review.reviewerImage}
                alt={`${review.reviewerName}'s profile`}
                className="reviewer-image w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primaryColor"
              />

              <h4 className="text-center text-[#7A7A7A]">
                {review.reviewerName}
              </h4>
              <p className="text-center mb-2 text-lg font-bold text-black">
                {review.reviewerEmail}
              </p>
            </div>
            <p className="text-center pt-9 text-[#636363]">
              {review.reviewDescription}
            </p>
            <button
              className="delete-button mt-5 px-6 py-3 text-white font-semibold rounded-lg border bg-red-600 hover:opacity-80 transition-all duration-300 ease-in-out"
              onClick={() => handleDelete(review._id)}
              disabled={deleteReviewMutation.isLoading}
            >
              {deleteReviewMutation.isLoading ? "Deleting..." : "Delete"}
            </button>
            {deleteReviewMutation.error && (
              <p style={{ color: "red" }}>Error deleting review</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
