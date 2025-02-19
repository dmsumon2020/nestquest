import { NavLink } from "react-router";
import { FaHome, FaProjectDiagram, FaTasks } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { SiBuymeacoffee } from "react-icons/si";

const DashboardLinksUser = () => {
  const links = [
    { to: "/", icon: <FaHome className="w-5 h-5" />, label: "Home" },

    {
      to: "/dashboard/my-profile",
      icon: <FaProjectDiagram className="w-5 h-5" />,
      label: "My Profile",
    },
    {
      to: "/dashboard/wishlist",
      icon: <FaTasks className="w-5 h-5" />,
      label: "Wishlist",
    },
    {
      to: "/dashboard/property-bought",
      icon: <SiBuymeacoffee className="w-5 h-5" />,
      label: "Property Bought",
    },
    {
      to: "/dashboard/my-reviews",
      icon: <GoCodeReview className="w-5 h-5" />,
      label: "My Reviews",
    },
  ];

  return (
    <nav className="flex-1 -mx-3 space-y-3">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-white  ${
              isActive
                ? "bg-primaryColor text-white"
                : "hover:bg-primaryColor hover:text-white"
            }`
          }
        >
          {link.icon}
          <span className="mx-2 text-sm font-bold">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardLinksUser;
