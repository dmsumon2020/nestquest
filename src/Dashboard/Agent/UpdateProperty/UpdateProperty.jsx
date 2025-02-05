import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useLocation } from "react-router";
import { GridLoader } from "react-spinners";

const UpdateProperty = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const { user, loading } = useAuth();
  const [errors, setErrors] = useState({});
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { state: property } = useLocation();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  const [formData, setFormData] = useState({
    title: property?.title,
    location: property?.location,
    city: property?.city,
    image: property?.image,
    agentName: user?.displayName || "",
    agentEmail: user?.email || "",
    minimumPrice: property?.minimumPrice,
    maximumPrice: property?.maximumPrice,
    propertyType: property?.propertyType,
    description: property?.description,
    verificationStatus: "pending",
  });

  useEffect(() => {
    // Update formData if user changes
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        agentName: user.displayName || "",
        agentEmail: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Please upload a valid image (JPEG, PNG, GIF).",
        }));
        return;
      }

      // Validate file size (e.g., max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "File size must be less than 2MB.",
        }));
        return;
      }

      // Upload the image to IMGBB using axiosPublic
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      try {
        const response = await axiosPublic.post(
          image_hosting_api,
          formDataImg,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type
            },
          }
        );

        if (response.data.success) {
          setFormData((prevData) => ({
            ...prevData,
            image: response.data.data.url, // Set the image URL in formData
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: "", // Clear any previous errors
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: "Image upload failed. Please try again.",
          }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "An error occurred while uploading the image.",
        }));
      }
    }
  };

  const showAlert = (icon, title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: icon,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close",
    });
  };

  // Use useMutation for the POST request
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosSecure.put(`/property/${property._id}`, data);
      return response;
    },
    onSuccess: () => {
      showAlert(
        "success",
        "Property Updated",
        "The property item has been successfully added."
      );
    },
    onError: (error) => {
      console.error("Error posting data:", error);
      showAlert(
        "error",
        "Failed to Update property",
        "An error occurred while adding the property."
      );
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // title validation
    if (formData.title.length < 5) {
      setErrors((prevError) => ({
        ...prevError,
        title: "Title name must be at least 5 characters long",
      }));
      return;
    }
    // location validation
    if (formData.location.length < 5) {
      setErrors((prevError) => ({
        ...prevError,
        location: "Location name must be at least 5 characters long",
      }));
      return;
    }

    // city name validation
    if (formData.city.length < 5) {
      setErrors((prevError) => ({
        ...prevError,
        city: "City name must be at least 5 characters long",
      }));
      return;
    }
    // minimum price
    if (
      isNaN(parseFloat(formData.minimumPrice)) ||
      parseFloat(formData.minimumPrice) < 1000
    ) {
      setErrors((prevError) => ({
        ...prevError,
        minimumPrice: "Minimum price must be at least 1000 and a valid number",
      }));
      return;
    }
    // Validate Maximum Price
    const maxPrice = parseFloat(formData.maximumPrice);
    if (isNaN(maxPrice) || maxPrice <= formData.minimumPrice) {
      setErrors((prevError) => ({
        ...prevError,
        maximumPrice: "Maximum price must be greater than the minimum price",
      }));
      return;
    }
    // Property type validation
    if (!formData.propertyType) {
      setErrors((prevError) => ({
        ...prevError,
        propertyType: "Property type must be selected",
      }));
      return;
    }

    // Description validation
    if (formData.description.trim().length < 50) {
      setErrors((prevError) => ({
        ...prevError,
        description: "Description must be at least 50 characters long",
      }));
      return;
    }

    // If all validations pass, send the data to the server
    mutation.mutate(formData);
  };

  return (
    <>
      <h2 className="text-5xl font-thin text-center pb-10">
        Update : {formData.title}
      </h2>

      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="image">
                Image Upload
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="agentName">
                Agent Name
              </label>
              <input
                id="agentName"
                name="agentName"
                type="text"
                value={formData.agentName}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="agentEmail">
                Agent Email
              </label>
              <input
                id="agentEmail"
                name="agentEmail"
                type="email"
                value={formData.agentEmail}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="minimumPrice">
                Minimum Price
              </label>
              <input
                id="minimumPrice"
                name="minimumPrice"
                type="number"
                value={formData.minimumPrice}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.minimumPrice && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.minimumPrice}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="maximumPrice">
                Maximum Price
              </label>
              <input
                id="maximumPrice"
                name="maximumPrice"
                type="number"
                value={formData.maximumPrice}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
              {errors.maximumPrice && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.maximumPrice}
                </p>
              )}
            </div>

            <div>
              <label className="text-gray-700" htmlFor="propertyType">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              >
                <option value="">Select Type</option>
                <option value="apartment">Apartment</option>
                <option value="shop">Shop</option>
                <option value="villa">Villa</option>
                <option value="duplex">Duplex</option>
                <option value="office">Office</option>
              </select>
              {errors.propertyType && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.propertyType}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              ></textarea>
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primaryColor rounded-lg hover:bg-primaryColorHover focus:outline-none focus:bg-primaryColor"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateProperty;
