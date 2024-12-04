import { ReactComponent as Moon } from 'assets/moon.svg';
import { ReactComponent as Sun } from 'assets/sun.svg';

const ThemeSwitcher = ({ theme, handleThemeSwitcherClick }) => {
  return (
    <button
      className="size-12 flex justify-center items-center hover:text-orange-400"
      onClick={handleThemeSwitcherClick}
    >
      {theme === 'dark' ? (
        <Sun />
      ) : (
        <Moon />
      )}
    </button>
  );
};

export { ThemeSwitcher };
