import { Burger } from "components/Burger/Burger";
import { Logo } from "components/Logo/Logo";
import { SearchBar } from "components/SearchBar/SearchBar";
import { ThemeSwitcher } from "components/ThemeSwitcher/ThemeSwitcher";
import { SearchIcon } from "components/SearchIcon/SearchIcon";

const Header = ({ handleBurgerClick }) => {
  return (
    <header className="flex flex-col gap-4 bg-gray-200 p-4">
      <nav className="container mx-auto flex flex-row justify-between items-center sm:gap-x-4 sm:px-4 md:px-8">
        <Burger handleBurgerClick={handleBurgerClick} />
        <div className="flex gap-2 sm:gap-4 mx-auto">
          <Logo />
          <h1 className="text-3xl font-bold text-orange-500">BareDit</h1>
        </div>
        <div className="flex sm:gap-2">
          <SearchIcon />
          <ThemeSwitcher />
        </div>
      </nav>
      {/* <hr className="bg-black size-px w-auto" /> */}
      {/* <SearchBar /> */}
    </header>
  );
};

export { Header };
