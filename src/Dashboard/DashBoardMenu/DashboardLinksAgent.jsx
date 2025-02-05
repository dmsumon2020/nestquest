import { NavLink } from "react-router";
import { FaHome, FaProjectDiagram, FaListAlt } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { SiSellfy } from "react-icons/si";
import { FaCodePullRequest } from "react-icons/fa6";

const DashboardLinksAgent = () => {
  const links = [
    { to: "/", icon: <FaHome className="w-5 h-5" />, label: "Home" },

    {
      to: "/dashboard/my-profile",
      icon: <FaProjectDiagram className="w-5 h-5" />,
      label: "Agent Profile",
    },
    {
      to: "/dashboard/add-property",
      icon: <MdOutlineAddBox className="w-5 h-5" />,
      label: "Add Property",
    },
    {
      to: "/dashboard/added-property",
      icon: <FaListAlt className="w-5 h-5" />,
      label: "My added properties",
    },
    {
      to: "/dashboard/sold-properties",
      icon: <SiSellfy className="w-5 h-5" />,
      label: "My sold properties",
    },
    {
      to: "/dashboard/requested-properties",
      icon: <FaCodePullRequest className="w-5 h-5" />,
      label: "Requested properties",
    },
  ];

  return (
    <nav className="flex-1 -mx-3 space-y-3">
      {links.map((link, index) => (
        <NavLink
          key={index}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  ${
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

export default DashboardLinksAgent;
