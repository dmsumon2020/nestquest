import Header from "../Components/layout/Header/Header";
import Footer from "../Components/layout/Footer/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
