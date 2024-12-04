import { Burger } from "components/Burger/Burger";
import { Logo } from "components/Logo/Logo";
import { SearchBar } from "components/SearchBar/SearchBar";
import { ThemeSwitcher } from "components/ThemeSwitcher/ThemeSwitcher";

const Header = ({ handleBurgerClick }) => {
  return (
    <header className="flex flex-col gap-4 bg-gray-200 p-4">
      <nav className="container mx-auto flex flex-row justify-between items-center gap-x-4">
        <Burger handleBurgerClick={handleBurgerClick} />
        <Logo />
        <h1 className="md:me-auto text-3xl font-bold text-orange-500">BareDit</h1>
        <ThemeSwitcher />
      </nav>
      <hr className="bg-black size-px w-auto" />
      <SearchBar />
    </header>
  );
};

export { Header };
