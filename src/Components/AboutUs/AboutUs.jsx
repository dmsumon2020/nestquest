import aboutUsImage from "../../assets/about-us.jpg";
import avatarImage from "../../assets/avatar.webp";

export default function AboutSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text content */}
        <div>
          <p className="text-teal-500 font-semibold text-sm mb-2">About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            We Provide You The Best Service <br /> Of Real Estate Industries
          </h2>
          <p className="text-gray-500 mb-4">
            Building when an unknown printer took a galley of type and scram
            bled it to make a type specimen book. It has survived not only five
            centuries, but also the leape.
          </p>
          <p className="text-gray-500 mb-6">
            when an unknown printer took a galley of type andetry scram bled it
            to make a type specimen book has survived not only centuriesalwith
            the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently.
          </p>

          {/* Author info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={avatarImage}
              alt="Mona Simpson"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Mona Simpson
              </h4>
              <p className="text-teal-500 text-sm">CEO, Portland Realty</p>
            </div>
          </div>

          <button className="bg-teal-500 text-white font-semibold py-2 px-6 rounded hover:bg-teal-600 transition">
            Contact With Us
          </button>
        </div>

        {/* Image section */}
        <div>
          <img
            src={aboutUsImage}
            alt="about us"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </section>
  );
}
