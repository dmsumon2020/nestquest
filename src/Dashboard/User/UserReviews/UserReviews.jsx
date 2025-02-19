import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";

const UserReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const email = user?.email;
  const queryClient = useQueryClient();

  // Fetch reviews for the logged-in user
  const fetchReviews = async (email) => {
    const response = await axiosSecure.get(`/reviews?email=${email}`);
    return response.data;
  };

  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userReviews", email],
    queryFn: () => fetchReviews(email),
    enabled: !!email,
  });

  // Mutation to delete a review by ID
  /* const deleteReview = useMutation({
    mutationFn: async (reviewId) => {
      const response = await axiosSecure.delete(`/reviews/delete/${reviewId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the query to refresh the reviews list
      queryClient.invalidateQueries(["userReviews", email]);
    },
    onError: (error) => {
      console.error("Failed to delete review:", error);
    },
  });*/
  const deleteReview = useMutation({
    mutationFn: async (reviewId) => {
      const response = await axiosSecure.delete(`/reviews/delete/${reviewId}`, {
        headers: {
          "X-User-Email": user?.email,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the query to refresh the reviews list
      queryClient.invalidateQueries(["userReviews", email]);
    },
    onError: (error) => {
      console.error("Failed to delete review:", error);
    },
  });

  const handleDelete = (reviewId) => {
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
        deleteReview.mutate(reviewId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) {
    return <div>Failed to load reviews. Please try again later.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-5xl font-thin text-center pb-10 dark:text-white">
        My Reviews
      </h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews have been made yet!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg shadow-sm bg-white dark:bg-[#323e4f] dark:border-gray-800"
            >
              <h3 className="text-lg font-bold dark:text-white">
                {review.propertyTitle}
              </h3>
              <p className="text-gray-600 text-sm dark:text-[#ccc]">
                Agent: {review.reviewerName}
              </p>
              <p className="text-gray-500 text-xs dark:text-[#ccc]">
                Reviewed on: {new Date(review.date).toLocaleDateString()} at{" "}
                {new Date(review.date).toLocaleTimeString()}
              </p>
              <p className="mt-2 dark:text-[#ccc]">
                {review.reviewDescription}
              </p>
              <button
                onClick={() => handleDelete(review._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white text-sm rounded-lg"
                disabled={deleteReview.isLoading}
              >
                {deleteReview.isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;
