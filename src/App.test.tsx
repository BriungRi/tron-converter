/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('App component', () => {
  it('renders Tron Converter header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Tron Converter/i);
    expect(headerElement).toBeTruthy();
  });
});