/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('App component', () => {
  it('renders Tron Converter header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Tron Converter/i);
    expect(headerElement).toBeTruthy();
  });

  it('renders both conversion forms', () => {
    render(<App />);

    // Check for form headings
    expect(screen.getByText('Tron => Hex')).toBeTruthy();
    expect(screen.getByText('Hex => Tron')).toBeTruthy();

    // Check for input fields
    expect(screen.getByLabelText('Enter Tron address')).toBeTruthy();
    expect(screen.getByLabelText('Enter Hex address')).toBeTruthy();

    // Check for convert buttons
    const convertButtons = screen.getAllByDisplayValue('Convert');
    expect(convertButtons).toHaveLength(2);
  });

  describe('TRON to Hex conversion', () => {
    it('converts TRON address to hex format', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter TRON address
      fireEvent.change(tronInput, { target: { value: 'TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb' } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that hex address is displayed
      expect(screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)).toBeTruthy();
    });

    it('shows error for invalid TRON address', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter invalid TRON address
      fireEvent.change(tronInput, { target: { value: 'invalid-address' } });

      // Mock alert function
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      // Click convert button
      fireEvent.click(convertButton);

      // Check that alert was called
      expect(alertSpy).toHaveBeenCalled();

      alertSpy.mockRestore();
    });
  });

  describe('Hex to TRON conversion', () => {
    it('converts hex address to TRON format', () => {
      render(<App />);

      const hexInput = screen.getByLabelText('Enter Hex address');
      const convertButton = screen.getAllByDisplayValue('Convert')[1];

      // Enter hex address
      fireEvent.change(hexInput, { target: { value: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that TRON address is displayed
      expect(screen.getByText(/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb/)).toBeTruthy();
    });

    it('shows Tronscan link for converted TRON address', () => {
      render(<App />);

      const hexInput = screen.getByLabelText('Enter Hex address');
      const convertButton = screen.getAllByDisplayValue('Convert')[1];

      // Enter hex address
      fireEvent.change(hexInput, { target: { value: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that Tronscan link is displayed
      const tronscanLink = screen.getByText('View on Tronscan');
      expect(tronscanLink).toBeTruthy();
      const linkElement = tronscanLink.closest('a');
      expect(linkElement?.href).toBe('https://tronscan.org/#/address/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb');
    });


  });

  describe('Round-trip conversion', () => {
    it('maintains address integrity through round-trip conversion', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const hexInput = screen.getByLabelText('Enter Hex address');
      const tronToHexButton = screen.getAllByDisplayValue('Convert')[0];
      const hexToTronButton = screen.getAllByDisplayValue('Convert')[1];

      // Start with TRON address
      const originalTronAddress = 'TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb';
      fireEvent.change(tronInput, { target: { value: originalTronAddress } });
      fireEvent.click(tronToHexButton);

      // Get the converted hex address
      const hexResult = screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/);
      expect(hexResult).toBeTruthy();

      // Now convert back to TRON
      fireEvent.change(hexInput, { target: { value: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' } });
      fireEvent.click(hexToTronButton);

      // Verify we get back the original TRON address
      expect(screen.getByText(/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb/)).toBeTruthy();
    });
  });
});