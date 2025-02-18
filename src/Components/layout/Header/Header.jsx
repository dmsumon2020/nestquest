import { Link, NavLink, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { useEffect, useState } from "react";
import userImage from "../../../assets/user.png";
import logo from "../../../assets/logo.png";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import { BiDownArrow } from "react-icons/bi";
import "./header.css";
import useUserRole from "../../../Hooks/useUserRole";
import { GridLoader } from "react-spinners";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogOut, user } = useAuth();
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate programmatically
  //const { role, isLoading, isError, refetch } = useUserRole(user?.email);

  //const { role, isLoading, isError, refetch } = useUserRole(email || "");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleProfileImageClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //console.log("Role: ", role);

  // const handleLinkClick = () => {
  //   setIsDropdownOpen(false); // Close dropdown when a link is clicked
  // };

  const handleUserLogout = () => {
    Swal.fire({
      title: "Do you really want to log out?",
      text: "If yes then, it is okay",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        userLogOut()
          .then(() => {
            Swal.fire({
              title: "Logged out!",
              text: "You have successfully logged out",
              icon: "success",
            });
          })
          .catch((error) => {
            console.err("user logout error", error);
          });
      }
    });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All properties", path: "/all-properties" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // admin dropdown links
  const dashboardLinksAdmin = [
    {
      to: "/dashboard/my-profile",
      label: "Admin Profile",
    },
    {
      to: "/dashboard/manage-properties",
      label: "Manage Properties",
    },
    {
      to: "/dashboard/manage-users",
      label: "Manage Users",
    },
    {
      to: "/dashboard/manage-reviews",
      label: "Manage Reviews",
    },
    {
      to: "/dashboard/advertise-properties",
      label: "Advertise Property",
    },
  ];

  // agent dropdown links
  const dashboardLinksAgent = [
    {
      to: "/dashboard/my-profile",
      label: "Agent Profile",
    },
    {
      to: "/dashboard/add-property",
      label: "Add Property",
    },
    {
      to: "/dashboard/added-property",
      label: "My added properties",
    },
    {
      to: "/dashboard/sold-properties",
      label: "My sold properties",
    },
    {
      to: "/dashboard/requested-properties",
      label: "Requested properties",
    },
  ];

  // users drop down links
  const dashboardLinksUser = [
    {
      to: "/dashboard/my-profile",
      label: "My Profile",
    },
    {
      to: "/dashboard/wishlist",
      label: "Wishlist",
    },
    {
      to: "/dashboard/property-bought",
      label: "Property Bought",
    },
    {
      to: "/dashboard/my-reviews",
      label: "My Reviews",
    },
  ];

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/"); // Redirect to home if not already on the home page
    }
  };

  // const handleProfileImageClick = () => {
  //   navigate("/dashboard/my-profile");
  // };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`relative  bg-white shadow-lg border-b-4 border-b-primaryColor transition-all duration-300  ${
        isScrolled ? "scroll-menu" : ""
      }`}
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <a onClick={handleLogoClick} className="cursor-pointer">
              {/* <img className="w-auto h-6 sm:h-7" src={logo} alt="Meraki UI" /> */}
              <img
                className="logo w-auto h-auto max-h-[50px]"
                src={logo}
                alt="Meraki UI"
              />
            </a>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 font-bold ${
                      isActive ? "text-primaryColor" : "hover:bg-gray-100"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {<NavLink></NavLink>}
              {user ? (
                <NavLink
                  onClick={handleUserLogout}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0  hover:bg-gray-100 font-bold"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to={"/signin"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0  hover:bg-gray-100 font-bold"
                >
                  Signin
                </NavLink>
              )}
              {!user && (
                <NavLink
                  to={"/registration"}
                  className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0  hover:bg-gray-100 font-bold"
                >
                  Registration
                </NavLink>
              )}
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              <button
                className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block  hover:text-gray-700  focus:text-gray-700  focus:outline-none"
                aria-label="show notifications"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="relative">
                <button
                  type="button"
                  className="flex items-center focus:outline-none"
                  aria-label="toggle profile dropdown"
                  data-tooltip-id="profile-tooltip"
                  data-tooltip-content={user?.displayName || "User"}
                  onClick={handleProfileImageClick}
                >
                  <Tooltip id="profile-tooltip" place="top" effect="solid" />

                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                    <img
                      src={user?.photoURL || userImage}
                      className="user-img first-line:object-cover w-full h-full"
                      alt="avatar"
                    />
                  </div>

                  <h3 className="mx-2 text-gray-700 lg:hiddenX">
                    {user?.displayName}
                  </h3>

                  <BiDownArrow className="text-lg font-bold" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      {/* {role === "admin" &&
                        dashboardLinksAdmin.map((link, index) => (
                          <li key={index}>
                            <Link
                              //onClick={handleLinkClick}
                              to={link.to}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))} */}
                      {/* {role === "agent" &&
                        dashboardLinksAgent.map((link, index) => (
                          <li key={index}>
                            <Link
                              //onClick={handleLinkClick}
                              to={link.to}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))} */}
                      {/* {(role === "user" || role === undefined) &&
                        dashboardLinksUser.map((link, index) => (
                          <li key={index}>
                            <Link
                              to={link.to}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))} */}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
