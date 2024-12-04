import { Burger } from "components/Burger/Burger";
import { Logo } from "components/Logo/Logo";
import { SearchBar } from "components/SearchBar/SearchBar";
import { ThemeSwitcher } from "components/ThemeSwitcher/ThemeSwitcher";

const Header = ({ handleBurgerClick }) => {
  return (
    <header className="flex flex-col gap-4 bg-gray-200 p-4">
      <nav className="container mx-auto flex flex-row justify-between items-center gap-x-4">
        <Burger handleBurgerClick={handleBurgerClick} />
        <div className="flex gap-2 sm:gap-4 md:mx-auto">
          <Logo />
          <h1 className="text-3xl font-bold text-orange-500">BareDit</h1>
        </div>
        <ThemeSwitcher />
      </nav>
      <hr className="bg-black size-px w-auto" />
      <SearchBar />
    </header>
  );
};

export { Header };
