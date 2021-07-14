import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Agence Bio link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Agence Bio/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Erwan link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Erwan Roussel/i);
  expect(linkElement).toBeInTheDocument();
});
