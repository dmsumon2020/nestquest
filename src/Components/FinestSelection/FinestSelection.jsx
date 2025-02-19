import { Link } from "react-router";
import banner from "../../assets/banner.jpg";
import { Fade } from "react-awesome-reveal";

const FinestSelection = () => {
  return (
    <Fade triggerOnce={true} delay={300}>
      <section>
        <div>
          <div className="banner-image group relative overflow-hidden h-[700px]">
            {/* Background Image */}
            <div
              className="image w-full h-full bg-cover bg-center transition-transform duration-500 ease-linear group-hover:scale-105"
              style={{ backgroundImage: `url(${banner})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>

            {/* Info Section */}
            <div className="info absolute inset-0 flex flex-col justify-center text-white py-12 w-10/12 lg:w-7/12 mx-auto">
              <div className="bg-primaryColor p-12 md:w-3/5 dark:bg-[#323e4f]">
                <h4 className="mb-4 text-white text-5xl font-light">
                  Discover Our Finest Selection
                </h4>
                <p className="text-lg mb-6 text-white py-4">
                  Choose from different listing templates and lay them out as
                  lists or grids, full-width or boxed.
                </p>

                <Link
                  className="px-6 py-3 text-white font-semibold rounded-lg border border-white hover:bg-white transition-all duration-300 ease-in-out hover:text-primaryColor"
                  to={"/all-properties"}
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default FinestSelection;
