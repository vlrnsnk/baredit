import { ReactComponent as MagnifyingGlass } from 'assets/magnifying-glass.svg';

const SearchIcon = () => {
  return (
    <div>
      <button className="size-12 flex justify-center items-center">
        <MagnifyingGlass />
      </button>
    </div>
  );
};

export { SearchIcon };
