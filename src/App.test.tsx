import React from 'react';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import useFetchProducts from './hook/useFetchProducts';
import App from './App';

jest.mock('./hook/useFetchProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches data on mount', () => {
    const fetchDataMock = jest.fn();
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      fetchData: fetchDataMock,
    });

    render(<App />);
    expect(fetchDataMock).toHaveBeenCalledTimes(1);
  });

  test('updates input value and fetches data on input change', async () => {
    const fetchDataMock = jest.fn();
    (useFetchProducts as jest.Mock).mockReturnValue({
      data: [],
      fetchData: fetchDataMock,
    });

    render(<App />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'Apple' } });
    expect(inputElement).toHaveValue('Apple');

    await waitFor(() => {
      expect(fetchDataMock).toHaveBeenCalledTimes(2);
    });
  });
});
