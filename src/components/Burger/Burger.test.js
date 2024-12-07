import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Burger } from "./Burger";

describe('Burger Component', () => {
  const mockHandleBurgerClick = jest.fn();

  it('renders without crashing', () => {
    render(<Burger handleBurgerClick={mockHandleBurgerClick} />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  it('calls handleBurgerClick on button click', () => {
    render(<Burger handleBurgerClick={mockHandleBurgerClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleBurgerClick).toHaveBeenCalledTimes(1);
  });

  it('button is hidden on larger screens', () => {
    render(<Burger handleBurgerClick={mockHandleBurgerClick} />);

    const button = screen.getByRole('button');

    // eslint-disable-next-line testing-library/no-node-access
    expect(button.closest('div')).toHaveClass('md:hidden');
  });
});
