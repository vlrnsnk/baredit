import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

global.matchMedia = jest.fn().mockImplementation(query => ({
  matches: query === '(prefers-color-scheme: dark)',
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

describe('Header Component', () => {
  const mockHandleBurgerClick = jest.fn();
  const mockHandleThemeSwitcherClick = jest.fn();
  const mockHandleSearchFormSubmit = jest.fn();
  const mockSetSearchQuery = jest.fn();

  const initialProps = {
    handleBurgerClick: mockHandleBurgerClick,
    theme: 'light',
    handleThemeSwitcherClick: mockHandleThemeSwitcherClick,
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
    handleSearchFormSubmit: mockHandleSearchFormSubmit,
  };

  it('renders Header component', () => {
    render(
      <Provider store={store}>
        <Header {...initialProps} />
      </Provider>
    );

    expect(screen.getByAltText('BareDit Logo')).toBeInTheDocument();
    // expect()
  });
});
