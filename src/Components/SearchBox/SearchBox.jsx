const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="bg-[#F7F7F7] dark:bg-gray-800">
      <div className="pb-4 w-9/12 mx-auto">
        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
    </section>
  );
};

export default SearchBox;
