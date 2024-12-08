import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe('SearchBar Component', () => {
  const mockSetSearchQuery = jest.fn();
  const mockHandleSearchFormSubmit = jest.fn();

  it('should render the search input field', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        handleSearchFormSubmit={mockHandleSearchFormSubmit}
      />
    );

    const input = screen.getByPlaceholderText(/Search Reddit/i);

    expect(input).toBeInTheDocument();
  });

  it('should display the search query passed as a prop', () => {
    const searchQuery = 'test query';

    render(
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={mockSetSearchQuery}
        handleSearchFormSubmit={mockHandleSearchFormSubmit}
      />
    );

    const input = screen.getByPlaceholderText(/Search Reddit/i);

    expect(input.value).toBe(searchQuery);
  });

  it('should call setSearchQuery when typing in the input field', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        handleSearchFormSubmit={mockHandleSearchFormSubmit}
      />
    );

    const input = screen.getByPlaceholderText(/Search Reddit/i);
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('new query');
  });

  it('should call handleSearchFormSubmit when form is submitted', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        handleSearchFormSubmit={mockHandleSearchFormSubmit}
      />
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockHandleSearchFormSubmit).toHaveBeenCalledTimes(1);
  });

  it('should update the query and submit the form', () => {
    render(
      <SearchBar
        searchQuery="search term"
        setSearchQuery={mockSetSearchQuery}
        handleSearchFormSubmit={mockHandleSearchFormSubmit}
      />
    );

    const input = screen.getByPlaceholderText(/Search Reddit/i);
    fireEvent.change(input, { target: { value: 'new search term' } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('new search term');

    const form = screen.getByRole('form');

    fireEvent.submit(form);
    expect(mockHandleSearchFormSubmit).toHaveBeenCalledTimes(1);
  });
});
