const SearchBar = () => {
  return (
    <div className="flex flex-row justify-center">
      <input
        className="px-4 py-2 self-center rounded-full"
        type="text"
        placeholder="Search Reddit"
        name="search-field"
        value=""
        onChange={() => {}}
      />
    </div>
  );
};

export { SearchBar };
