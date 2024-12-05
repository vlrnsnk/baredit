import { Burger } from "components/Burger/Burger";
import { Logo } from "components/Logo/Logo";
import { SearchBar } from "components/SearchBar/SearchBar";
import { ThemeSwitcher } from "components/ThemeSwitcher/ThemeSwitcher";

const Header = ({ handleBurgerClick, theme, handleThemeSwitcherClick, searchQuery, setSearchQuery }) => {
  return (
    <header className="flex flex-col gap-4 bg-gray-200 dark:bg-gray-900 dark:text-gray-200  p-4">
      <nav className="container mx-auto flex flex-row justify-between items-center sm:gap-x-4 sm:px-4 md:px-8">
        <Burger handleBurgerClick={handleBurgerClick} />
        <div className="flex gap-2 sm:gap-4 sm:mx-auto hidden logo me-auto">
          <Logo />
          <h1 className="text-3xl font-bold text-orange-500 hidden heading">BareDit</h1>
        </div>
        <div className="flex sm:gap-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ThemeSwitcher
            theme={theme}
            handleThemeSwitcherClick={handleThemeSwitcherClick}
          />
        </div>
      </nav>
    </header>
  );
};

export { Header };
