import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GridLoader } from "react-spinners";
import useAuth from "../../../Hooks/useAuth";
import "./PaymentPage.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { propertyId, offeredAmount } = location?.state || {};
  const [paymentStatus, setPaymentStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch client secret using TanStack Query v5
  const {
    data: clientSecret,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["clientSecret", offeredAmount],
    queryFn: async () => {
      const response = await axiosSecure.post(
        "/create-payment-intent",
        { amount: offeredAmount },
        {
          headers: {
            "X-User-Email": user?.email,
          },
        }
      );
      return response.data.clientSecret;
    },
    enabled: !!offeredAmount, // Only run if offeredAmount is available
    retry: false, // Disable retry for more predictable behavior
  });

  // Mutation to update the property status
  const mutation = useMutation({
    mutationFn: async (transactionId) => {
      const response = await axiosSecure.post(
        `/properties/${propertyId}/pay`,
        { transactionId }, // Request body
        {
          headers: {
            "X-User-Email": user?.email,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      navigate("/dashboard/property-bought");
    },
    onError: (mutationError) => {
      console.error("Error updating property status:", mutationError);
      setPaymentStatus("Failed to update the property status.");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isFetching) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

    if (stripeError) {
      setPaymentStatus(`Payment failed: ${stripeError.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentStatus("Payment successful!");
      mutation.mutate(paymentIntent.id); // Trigger mutation
    }
  };

  if (isFetching)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) {
    return (
      <p className="text-red-500">
        Error fetching client secret: {error.message}
      </p>
    );
  }

  return (
    <div className="w-11/12 mx-auto stripe-payment">
      <h1 className="text-5xl font-thin text-center pb-10">Complete Payment</h1>
      <p className="font-bold text-green-600 text-2xl mb-5">
        Amount: ${offeredAmount}
      </p>
      {paymentStatus && <p>{paymentStatus}</p>}
      <form className="w-4/5 md:w-2/5" onSubmit={handleSubmit}>
        <div className="payment-input-container">
          <CardElement />
        </div>
        <button type="submit" disabled={!stripe || mutation.isLoading}>
          {mutation.isLoading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

const PaymentWrapper = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default PaymentWrapper;
