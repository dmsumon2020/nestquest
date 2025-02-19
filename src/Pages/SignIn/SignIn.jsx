import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

const SignIn = () => {
  // state for controlling form data

  const [errors, setErrors] = useState({});

  // calling auth context
  const { userLogin, userLoginByGoogle, setLoading } = useAuth();

  // this part is for redirecting user after login
  const location = useLocation();
  //const from = location?.state || "/";
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  console.log("from", from);

  /**
   * handle user login
   */
  const handleUserLogin = async (event) => {
    event.preventDefault();
    // Reset previous errors
    setErrors({});

    // Create a new FormData object from the form
    const formData = new FormData(event.target);

    // Convert FormData entries to a plain JavaScript object
    const formDataObj = Object.fromEntries(formData.entries());

    // Set the state with the converted object

    const { email, password } = formDataObj;

    // Email address validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors((prevError) => ({
        ...prevError,
        email: "Please type a valid email address",
      }));
      return;
    }

    // Password validation

    if (!password) {
      setErrors((prevError) => ({
        ...prevError,
        password: "The password field can not be empty",
      }));
      return;
    }

    try {
      setLoading(true);
      const userCredential = await userLogin(email, password);
      const user = userCredential.user;
      if (user) {
        Swal.fire({
          title: "Success",
          text: "You have successfully logged in",
          icon: "success",
        });
        event.target.reset();
        navigate(from);
      }
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        Swal.fire({
          title: "Error!!",
          text: "Your provided username and password do not match",
          icon: "error",
        });
        event.target.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * handle Google login
   */

  // Mutation for saving user data during Google login
  const axiosPublic = useAxiosPublic();

  const googleLoginMutation = useMutation({
    mutationFn: async (userInfo) => {
      const response = await axiosPublic.post("/add/user", userInfo);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success",
        text: "You have successfully logged in",
        icon: "success",
      });
      navigate(from);
    },
    onError: (error) => {
      console.error("Error saving user data:", error);
      Swal.fire({
        title: "Error",
        text: "There was an error saving your data.",
        icon: "error",
      });
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await userLoginByGoogle();
      const user = result.user;

      if (user) {
        const userInfo = {
          user: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "user",
          fraud: "no",
        };

        // Use the mutation to save the user info
        googleLoginMutation.mutate(userInfo);
      }
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-cancelled") {
        Swal.fire({
          title: "Error",
          text: "You have cancelled the Google sign-in process.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "An error occurred during login.",
          icon: "error",
        });
      }
    }
  };

  /**
   * handle password recovery
   */
  const emailRef = useRef(null);

  const handleRecoverPassword = (event) => {
    event.preventDefault(); // Prevent default link behavior
    const email = emailRef.current.value;

    navigate("/recover-password", { state: { email } });
  };

  return (
    <section className="bg-sectionBgColor py-20 dark:bg-[#323e4f]">
      <div className="heading-container w-11/12 md:w-9/12 mx-auto">
        <h4 className="font-subheadingFont text-[40px] leading-[40px] text-center text-primaryColor md:pt-10 pb-2">
          To use our services Pls...
        </h4>

        <h3 className="font-headingFont text-[30px] leading-[30px] md:text-[55px] md:leading-[55px] font-bold text-center text-[#111] pb-[4rem] dark:text-white">
          Login Here
        </h3>
      </div>

      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src={logo} alt="Logo" />
        </div>

        <form className="mt-6" onSubmit={handleUserLogin}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              className="block w-full px-4 py-2 mt-2 text-gray-700  border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm text-gray-800">
                Password
              </label>
              <a
                href="#"
                onClick={handleRecoverPassword}
                className="text-xs text-gray-600 hover:underline dark:text-white"
              >
                Forget Password?
              </a>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primaryColor rounded-lg hover:bg-primaryColorHover focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b lg:w-1/5"></span>

          <a
            href="#"
            className="text-xs text-center text-gray-500 uppercase hover:underline dark:text-white"
          >
            or login with Google
          </a>

          <span className="w-1/5 border-b lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
          >
            <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
            </svg>
            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
          </button>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-400 dark:text-white">
          Don&apos;t have an account?{" "}
          <Link
            to="/registration"
            state={from} // Pass the location state
            className="font-medium text-gray-700 hover:underline dark:text-white"
          >
            Register an Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
