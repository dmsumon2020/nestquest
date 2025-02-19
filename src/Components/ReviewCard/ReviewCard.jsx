import { LuQuote } from "react-icons/lu";

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded shadow-md p-8 hover:shadow-lg dark:bg-[#323e4f]">
      <div className="relative">
        <img
          src={review.reviewerImage}
          alt={review.reviewerName}
          className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primaryColor"
        />
        <h3 className="text-center text-[#7A7A7A] dark:text-white">
          {review.reviewerName}
        </h3>
        <p className="text-center mb-2 text-lg font-bold text-black dark:text-white">
          {review.propertyTitle}
        </p>
        <p className="text-center pt-9 text-[#636363] dark:text-[#ccc]">
          {review.reviewDescription}
        </p>
        <div className="absolute right-0 top-0">
          <LuQuote className="text-primaryColor text-6xl" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
