const SectionHeader = ({ heading, subHeading }) => {
  return (
    <div className="text-center pb-10 md:pb-20 w-11/12 lg:w-5/12 mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 dark:text-white">
        {heading}
      </h3>
      <h4 className="text-[#7a7a7a] dark:text-[#ccc] text-lg">{subHeading}</h4>
    </div>
  );
};

export default SectionHeader;
