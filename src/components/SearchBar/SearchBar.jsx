const SearchBar = () => {
  return (
    <div>
      <input type="text" placeholder="Search Reddit" name="search-field" value="" />
      <button type="submit">Search</button>
    </div>
  );
};

export { SearchBar };
