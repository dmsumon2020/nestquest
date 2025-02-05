const ReviewCardManageReviews = ({
  review,
  handleDelete,
  deleteReviewMutation,
}) => {
  return (
    <div className="review-card">
      <div className="reviewer-info">
        <img
          src={review?.reviewerImage}
          alt={`${review?.reviewerName}'s profile`}
          className="reviewer-image"
        />
        <div>
          <h4>{review?.reviewerName}</h4>
          <p>{review?.reviewerEmail}</p>
        </div>
      </div>
      <p>{review?.reviewDescription}</p>
      <button
        className="delete-button"
        onClick={() => handleDelete(review?._id)}
        disabled={deleteReviewMutation.isLoading}
      >
        {deleteReviewMutation?.isLoading ? "Deleting..." : "Delete"}
      </button>
      {deleteReviewMutation?.error && (
        <p style={{ color: "red" }}>Error deleting review</p>
      )}
    </div>
  );
};

export default ReviewCardManageReviews;
