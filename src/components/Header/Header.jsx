import { Logo } from "components/Logo/Logo";
import { SearchBar } from "components/SearchBar/SearchBar";
import { ThemeSwitcher } from "components/ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  return (
    <header className="medium padding amber5">
      <nav className="left-align responsive">
        <div className="horizontal">
          <Logo />
          <h1 className="small bold">BareDit</h1>
          {/* <div class="max"></div> */}
          <ThemeSwitcher />
        </div>
        <SearchBar />
      </nav>
    </header>
  );
};

export { Header };
