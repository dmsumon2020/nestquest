import { Link, Outlet, useLocation, useNavigate } from "react-router";
import DashboardLinksUser from "./DashboardLinksUser";
import { FaCog } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useUserRole from "../../Hooks/useUserRole";
import DashboardLinksAgent from "./DashboardLinksAgent";
import DashboardLinksAdmin from "./DashboardLinksAdmin";
import logo from "../../assets/logo.png";
import { GridLoader } from "react-spinners";
import { useEffect } from "react";

const DashBoardMenu = () => {
  const { user, loading } = useAuth();
  const { role, isLoading, isError, refetch } = useUserRole(user?.email);
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Navigate programmatically

  const handleLogoClick = () => {
    if (location.pathname !== "/") {
      navigate("/"); // Redirect to home if not already on the home page
    }
  };

  // Refetch the role when the user changes
  useEffect(() => {
    if (user?.email) {
      refetch(); // Trigger refetch when the user email changes
    }
  }, [user?.email, refetch]);

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <GridLoader color="#08AEEB" loading={true} size={100} />
      </div>
    );

  if (isError) return <p>Error fetching user role</p>;

  return (
    <section className="flex flex-col lg:flex-row">
      <aside className="flex flex-col lg:w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
        <a onClick={handleLogoClick} className="cursor-pointer">
          <img className="w-auto h-7" src={logo} alt="Logo" />
        </a>

        <div className="flex flex-col justify-between flex-1 mt-6">
          {/* Render different links based on the role */}
          {role === "admin" && <DashboardLinksAdmin />}
          {role === "agent" && <DashboardLinksAgent />}
          {role === "user" && <DashboardLinksUser />}

          <div className="mt-6">
            <div className="flex items-center justify-between mt-6">
              <a href="#" className="flex items-center gap-x-2">
                <img
                  className="object-cover rounded-full w-[40px] h-[40px]"
                  src={user?.photoURL}
                  alt="avatar"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user?.displayName}
                </span>
              </a>

              <Link
                to="/dashboard"
                className="text-gray-500 transition-colors duration-200 rotate-180 rtl:rotate-0 hover:text-blue-500"
              >
                <FaCog className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* dashboard content */}
      <section className="flex-1 md:p-8 bg-sectionBgColor">
        <Outlet />
      </section>
    </section>
  );
};

export default DashBoardMenu;
