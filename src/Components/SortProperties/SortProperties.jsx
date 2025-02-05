const SortProperties = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="mb-4">
      <label htmlFor="sort" className="mr-2">
        Sort by Price:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border border-gray-300 rounded p-2"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortProperties;
