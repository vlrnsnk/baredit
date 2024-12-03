import { ReactComponent as Moon } from 'assets/moon.svg';

const ThemeSwitcher = () => {
  return (
    <button className="size-12 flex justify-end items-center">
      <Moon />
    </button>
  );
};

export { ThemeSwitcher };
