import { NavLink } from "react-router";
import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import { RiAdvertisementLine } from "react-icons/ri";

const DashboardLinksAdmin = () => {
  const links = [
    { to: "/", icon: <FaHome className="w-5 h-5" />, label: "Home" },

    {
      to: "/dashboard/my-profile",
      icon: <FaProjectDiagram className="w-5 h-5" />,
      label: "Admin Profile",
    },
    {
      to: "/dashboard/manage-properties",
      icon: <FaTasks className="w-5 h-5" />,
      label: "Manage Properties",
    },
    {
      to: "/dashboard/manage-users",
      icon: <FaUsers className="w-5 h-5" />,
      label: "Manage Users",
    },
    {
      to: "/dashboard/manage-reviews",
      icon: <FaChartLine className="w-5 h-5" />,
      label: "Manage Reviews",
    },
    {
      to: "/dashboard/advertise-properties",
      icon: <RiAdvertisementLine className="w-5 h-5" />,
      label: "Advertise Property",
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
          <span className="mx-2 text-sm font-black">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default DashboardLinksAdmin;
