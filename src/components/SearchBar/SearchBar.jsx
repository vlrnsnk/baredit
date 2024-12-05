const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-row justify-center">
      <input
        className="px-4 py-2 self-center rounded-full dark:bg-gray-200 text-orange-400 outline-orange-400"
        type="text"
        placeholder="Search Reddit"
        name="search-field"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value) }
      />
    </div>
  );
};

export { SearchBar };
