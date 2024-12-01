import { Logo } from "components/Logo/Logo";
import { SearchBar } from "components/SearchBar/SearchBar";
import { ThemeSwitcher } from "components/ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header>
      <Logo />
      <h1>BareDit</h1>
      <ThemeSwitcher />
      <SearchBar />
    </header>
  );
};

export { Header };
