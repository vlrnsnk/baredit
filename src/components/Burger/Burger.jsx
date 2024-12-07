import { ReactComponent as BurgerIcon } from 'assets/bars.svg';

const Burger = ({ handleBurgerClick }) => {
  return (
    <div className="md:hidden">
      <button
        className="flex justify-center items-center size-12 cursor-pointer hover:text-orange-500"
        type="button"
        onClick={handleBurgerClick}
        aria-label="Open Menu"
      >
        <BurgerIcon />
      </button>
    </div>
  );
};

export { Burger };
