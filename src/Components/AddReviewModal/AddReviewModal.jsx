import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const AddReviewModal = ({ propertyID, propertyTitle, isOpen, onClose }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newReview) => {
      const response = await axiosSecure.post("/reviews", newReview);
      return response.data;
    },
    onSuccess: () => {
      // Display success alert
      Swal.fire({
        icon: "success",
        title: "Review Added",
        text: "Your review has been successfully added.",
      });

      // Refetch related queries to update the UI
      queryClient.invalidateQueries(["reviews", propertyID]);

      // Clear the form and close the modal
      document.getElementById("reviewForm").reset();
      onClose();
    },
    onError: (error) => {
      console.error("Error adding review:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add review. Please try again.",
      });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const reviewDescription = event.target.reviewDescription.value;

    // Construct the review object
    const newReview = {
      propertyID,
      propertyTitle,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
      reviewDescription,
      date: new Date().toISOString(),
    };

    mutation.mutate(newReview);
  };

  return (
    <div
      x-data="{ isOpen: isOpen }"
      className={`fixed inset-0 z-10 ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-6 w-6/12">
          <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
          <form id="reviewForm" onSubmit={handleSubmit}>
            <textarea
              name="reviewDescription"
              placeholder="Write your review here..."
              className="w-full border border-gray-300 rounded-lg p-3 mt-2"
              rows={6}
              required
            ></textarea>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
