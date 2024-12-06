import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders Footer Component', () => {
    render(<Footer />);
    
    expect(screen.getByText('vlrnsnk')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /vlrnsnk/i })).toHaveAttribute('href', 'https://github.com/vlrnsnk');
  });
});
