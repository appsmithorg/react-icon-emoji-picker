import React from 'react';
import { render } from '@testing-library/react';
import Popup from '../components/Popup';

test('renders popup when open is true', () => {
  const open = true;
  const { getByText } = render(<Popup open={open} />);
  const linkElement = getByText(/done/i);
  expect(linkElement).toBeInTheDocument();
});

test('Popup returns null when open is false', () => {
  const open = false;
  const { container } = render(<Popup open={open} />);
  expect(container.firstChild).toBeNull();
});
