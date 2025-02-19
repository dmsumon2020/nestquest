import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Registration = () => {
  const [errors, setErrors] = useState({});
  const {
    createUser,
    userLoginByGoogle,
    setLoading,
    updateUsernameAndPhotoUrl,
    setUser,
  } = useAuth();

  const location = useLocation();
  const from = location?.state || "/";
  const navigate = useNavigate();

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    });
  };

  const axiosPublic = useAxiosPublic();

  // Mutation for saving user data during registration
  const registerMutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axiosPublic.post("/add/user", userData);
      return response.data;
    },
    onSuccess: () => {
      showAlert("success", "Success!", "Account Created Successfully.");
      navigate(from);
    },
    onError: (error) => {
      console.error("Failed to save user:", error.message);
      showAlert("error", "Error!", "Failed to save user data.");
    },
  });

  // Mutation for saving user data during Google login
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

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    const { username, email, password, confirmPassword } = formDataObj;

    // Validation logic
    if (username.length < 5) {
      setErrors((prevError) => ({
        ...prevError,
        username: "Username must be at least 5 characters long",
      }));
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setErrors((prevError) => ({
        ...prevError,
        email: "Please type a valid email address",
      }));
      return;
    }

    const photoFile = event.target.photoUrl.files[0];
    if (!photoFile) {
      setErrors((prevError) => ({
        ...prevError,
        photoUrl: "Please upload a photo",
      }));
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevError) => ({
        ...prevError,
        password:
          "Your password must be minimum 6 characters long and must contain one uppercase letter, one lowercase letter, and one digit",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevError) => ({
        ...prevError,
        confirmPassword: "Your entered password doesn't match",
      }));
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUser(email, password);

      // Upload the image to ImgBB
      const imgbbApiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", photoFile);
      imgbbFormData.append("key", imgbbApiKey);

      const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imgbbFormData,
      });

      const imgbbData = await imgbbResponse.json();
      if (imgbbData.success) {
        const imageUrl = imgbbData.data.url; // Get the image URL from the response

        // Update username and photo URL
        const updatedUser = await updateUsernameAndPhotoUrl(username, imageUrl);
        if (updatedUser) {
          setUser(updatedUser);

          const dataForDb = {
            user: username,
            email: email,
            image: imageUrl, // Use the ImgBB URL here
            role: "user",
            fraud: "no",
          };

          registerMutation.mutate(dataForDb);
        }
      } else {
        setErrors((prevError) => ({
          ...prevError,
          photoUrl: "Failed to upload image to ImgBB",
        }));
      }
    } catch (firebaseError) {
      console.error("Error creating user in Firebase:", firebaseError.message);
      console.log(firebaseError.message);

      if (
        firebaseError.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        const errorMessage = "This email is already in use";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error!: ${errorMessage}`,
        });
      } else {
        const errorMessage = "Something went wrong! in server side";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error!: ${errorMessage}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <section className="bg-sectionBgColor py-20 dark:bg-[#323e4f]">
        <div className="heading-container w-11/12 md:w-9/12 mx-auto">
          <h4 className="font-subheadingFont text-[40px] leading-[40px] text-center text-primaryColor md:pt-10 pb-2">
            Just in few steps
          </h4>

          <h3 className="font-headingFont text-[30px] leading-[30px] md:text-[55px] md:leading-[55px] font-bold text-center text-[#111] pb-[4rem] dark:text-white">
            Become a registered user
          </h3>
        </div>

        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <form onSubmit={handleCreateUser} className="mt-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-800 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="username"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-800 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div className="mt-4">
              <label
                htmlFor="photoUrl"
                className="block text-sm text-gray-800 dark:text-white"
              >
                Photo Upload
              </label>
              <input
                type="file"
                name="photoUrl"
                accept="image/*" // Restrict file types to images only
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
              />
              {errors.photoUrl && (
                <p className="mt-2 text-sm text-red-600">{errors.photoUrl}</p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-800 dark:text-white"
                >
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm text-gray-800 dark:text-white"
                >
                  Confirm Password
                </label>
              </div>

              <input
                type="password"
                name="confirmPassword"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-primaryColorHover focus:ring-primaryColor focus:outline-none focus:ring focus:ring-opacity-40 dark:bg-[#323e4f] dark:text-white"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primaryColor rounded-lg hover:bg-primaryColorHover focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Register
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/5"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase hover:underline"
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

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Already have an account?
            <Link
              to="/signin"
              state={from} // Pass the location state
              className="font-medium text-gray-700 hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Registration;
