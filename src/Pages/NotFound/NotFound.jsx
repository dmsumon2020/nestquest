import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate("/");
  };

  return (
    <section id="error-page">
      <Helmet>
        <title>404 - Page Not Found | Career Climb </title>
        <meta name="description" content="Welcome to Career Climb" />
      </Helmet>

      <div className="w-10/12 md:max-w-7xl mx-auto flex flex-col items-center justify-center h-screen">
        <h1 className="text-primaryColor text-6xl font-bold">Oops!</h1>
        <p className="font-bold text-xl md:text-3xl mt-10 mb-5 text-center">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i>Not Found</i>
        </p>
        <button
          onClick={handleGoToHomePage}
          className="mt-10 flex items-center gap-2 font-bold text-lg bg-[#EB5942] py-[11px] px-[22px]  text-white border border-[#EB5942] hover:bg-transparent transition-all duration-500 hover:text-[#EB5942] hover:border-[#EB5942]"
        >
          Go Back to Home page
        </button>
      </div>
    </section>
  );
};

export default NotFound;
