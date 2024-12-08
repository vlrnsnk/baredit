import '@testing-library/jest-dom';
import { screen, render, fireEvent } from "@testing-library/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { ReactComponent as Moon } from 'assets/moon.svg';
import { ReactComponent as Sun } from 'assets/sun.svg';

jest.mock('assets/moon.svg', () => ({
  ReactComponent: () => <svg data-testid="moon-icon" />,
}));

jest.mock('assets/sun.svg', () => ({
  ReactComponent: () => <svg data-testid="sun-icon" />,
}));

describe('ThemeSwitcher', () => {
  const mockHandleThemeSwitcherClick = jest.fn();

  it('renders the Moon icon when theme is "light"', () => {
    render(
      <ThemeSwitcher
        theme="light"
        handleThemeSwitcherClick={mockHandleThemeSwitcherClick}
      />
    );

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('renders the Sun icon when theme is "dark"', () => {
    render(
      <ThemeSwitcher
        theme="dark"
        handleThemeSwitcherClick={mockHandleThemeSwitcherClick}
      />
    );

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('calls handleThemeSwitcherButtonClick when the button is clicked', () => {
    render(
      <ThemeSwitcher
        theme="light"
        handleThemeSwitcherClick={mockHandleThemeSwitcherClick}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /change theme/i }));

    expect(mockHandleThemeSwitcherClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct aria-label for accessibility', () => {
    render(
      <ThemeSwitcher
        theme="light"
        handleThemeSwitcherClick={mockHandleThemeSwitcherClick}
      />
    );

    const button = screen.getByRole('button', { name: /change theme/i });

    expect(button).toBeInTheDocument();
  });

  it('renders the correct classes for styling', () => {
    render(
      <ThemeSwitcher
        theme="light"
        handleThemeSwitcherClick={mockHandleThemeSwitcherClick}
      />
    );

    const button = screen.getByRole('button');

    expect(button).toHaveClass('size-12', 'flex', 'justify-center', 'items-center', 'hover:text-orange-400');
  });
});
