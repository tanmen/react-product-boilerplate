import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {App} from './App';

test('renders learn react link', () => {
  const {getByText} = render(<App/>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  userEvent.click(screen.getByText(/learn react/i));
});
