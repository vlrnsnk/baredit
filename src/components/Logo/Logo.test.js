import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe('Logo Component', () => {
  it('renders the logo image', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText(/baredit logo/i);

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', expect.stringContaining('logo.png'));
  });

  it('renders the correct link', () => {
    render(<Logo />);

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://baredit.netlify.app/');
  });

  it('has the correct alt text for the image', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText(/baredit logo/i);

    expect(logoImage).toHaveAttribute('alt', 'BareDit Logo');
  });

  it('image has correct class names', () => {
    render(<Logo />);

    const logoImage = screen.getByAltText(/baredit logo/i);

    expect(logoImage).toHaveClass('size-9', 'rounded-full');
  });

  it('link has correct class names', () => {
    render(<Logo />);

    const link = screen.getByRole('link');

    expect(link).toHaveClass('shrink-0');
  });
});
