import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import StartForm from './components/StartForm/StartForm';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('should render a login button', () => {
  render(<StartForm/>)
  const loginButton = screen.getByText('Log in')
  expect(loginButton).toBeInTheDocument()
  
});
