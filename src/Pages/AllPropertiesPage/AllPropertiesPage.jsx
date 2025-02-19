import { useState } from "react";
import SearchBox from "../../Components/SearchBox/SearchBox";
import AllProperties from "../../Components/AllProperties/AllProperties";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import { Fade } from "react-awesome-reveal";

const AllPropertiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Fade triggerOnce={true} delay={300}>
        <section className="bg-[#F7F7F7] pt-20 dark:bg-gray-800">
          <SectionHeader
            heading="All Properties"
            subHeading="Explore over 2000 properties for rent, listed by the top agents nationwide, offering options for every lifestyle and budget."
          />
        </section>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AllProperties searchTerm={searchTerm} />
      </Fade>
    </>
  );
};

export default AllPropertiesPage;
