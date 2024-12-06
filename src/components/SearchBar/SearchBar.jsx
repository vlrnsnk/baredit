const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearchFormSubmit,
}) => {
  return (
    <div className="flex flex-row justify-center">
      <form onSubmit={(e) => handleSearchFormSubmit(e)}>
        <input
          className="px-4 py-2 self-center rounded-full dark:bg-gray-200 text-gray-900 outline-orange-400"
          type="text"
          placeholder="Search Reddit"
          name="search-field"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value) }
        />
      </form>
    </div>
  );
};

export { SearchBar };
