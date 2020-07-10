import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {RootTemplate} from './RootTemplate';

test('renders learn react link', () => {
  const mockCreate = jest.fn();
  const {getByText} = render(
    <MemoryRouter>
      <RootTemplate create={mockCreate}/>
    </MemoryRouter>
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  userEvent.click(screen.getByText(/learn react/i));
});
