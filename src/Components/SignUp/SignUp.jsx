import { Link } from "react-router";

const signUp = () => {
  return (
    <section className="bg-primaryColor dark:bg-[#323e4f] py-6 md:py-12">
      <div className="section-wrap w-11/12 md:w-9/12 mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl md:text-3xl  text-white mb-4 font-bold">
            Want To Become A Real Estate Agent?
          </h2>
          <p className="text-white">
            We'll help you to grow your career and growth.
          </p>
        </div>
        <div>
          <Link className="px-6 py-3 text-white font-semibold rounded-lg border border-white hover:bg-white transition-all duration-300 ease-in-out hover:text-primaryColor">
            Signup Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default signUp;
