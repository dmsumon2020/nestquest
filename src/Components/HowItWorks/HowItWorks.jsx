import { FaMapMarkedAlt } from "react-icons/fa";
import SectionHeader from "../SectionHeader/SectionHeader";
import { HiUsers } from "react-icons/hi";
import { SlCalender } from "react-icons/sl";

const HowItWorks = () => {
  return (
    <section className="bg-white dark:bg-gray-800 py-16 md:py-32">
      <div className="section-wrap w-11/12 md:w-9/12 mx-auto">
        <SectionHeader
          heading="The Steps it Works with"
          subHeading="We work in the fastest method ever"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-12">
          {/* Card 1 */}
          <div className="how-it-works bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-12 text-center flex flex-col items-center relative">
            <div className="count absolute top-0 right-0 text-center w-[90px] h-[90px] bg-[#ebf9ff] leading-[90px] text-[26px] font-medium border-l border-b border-[#dbe8fb] rounded-bl-[70px] text-primaryColor">
              1
            </div>

            <FaMapMarkedAlt className="text-7xl text-primaryColor mb-7" />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Evaluate Property
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have Ipsum available.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-12 text-center flex flex-col items-center relative">
            <div className="count absolute top-0 right-0 text-center w-[90px] h-[90px] bg-[#ebf9ff] leading-[90px] text-[26px] font-medium border-l border-b border-[#dbe8fb] rounded-bl-[70px] text-primaryColor">
              2
            </div>

            <HiUsers className="text-7xl text-primaryColor mb-7" />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Meet Your Agent
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have Ipsum available.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-12 text-center flex flex-col items-center relative">
            <div className="count absolute top-0 right-0 text-center w-[90px] h-[90px] bg-[#ebf9ff] leading-[90px] text-[26px] font-medium border-l border-b border-[#dbe8fb] rounded-bl-[70px] text-primaryColor">
              3
            </div>
            <SlCalender className="text-7xl text-primaryColor mb-7" />

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Close The Deal
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have Ipsum available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
