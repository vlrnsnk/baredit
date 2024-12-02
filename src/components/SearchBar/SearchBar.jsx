import { ReactComponent as MagnifyingGlass } from 'assets/magnifying-glass.svg';

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
      {/* <button
        className="size-12 flex justify-center items-center"
        type="submit">
        <MagnifyingGlass />
      </button> */}
    </div>
  );
};

export { SearchBar };
