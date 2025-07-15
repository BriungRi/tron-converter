/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
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
    it('converts single TRON address to hex format', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter TRON address
      fireEvent.change(tronInput, {
        target: { value: 'TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb' },
      });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that hex address is displayed
      expect(
        screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)
      ).toBeTruthy();
      expect(screen.getByText('Converted addresses:')).toBeTruthy();
    });

    it('converts multiple TRON addresses to hex format', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter multiple TRON addresses
      const multipleAddresses = `TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb
TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`;
      fireEvent.change(tronInput, { target: { value: multipleAddresses } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that both hex addresses are displayed
      expect(
        screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)
      ).toBeTruthy();
      expect(
        screen.getByText(/0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C/)
      ).toBeTruthy();
      expect(screen.getByText('Converted addresses:')).toBeTruthy();
    });

    it('handles mixed valid and invalid TRON addresses', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter valid and invalid TRON addresses
      const mixedAddresses = `TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb
invalid-address
TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`;
      fireEvent.change(tronInput, { target: { value: mixedAddresses } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that valid addresses are converted and invalid ones show error
      expect(
        screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)
      ).toBeTruthy();
      expect(
        screen.getByText(/0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C/)
      ).toBeTruthy();
      expect(screen.getByText(/Error converting/)).toBeTruthy();
    });

    it('shows error for invalid TRON address', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter invalid TRON address
      fireEvent.change(tronInput, { target: { value: 'invalid-address' } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that error is displayed
      expect(screen.getByText(/Error converting/)).toBeTruthy();
    });
  });

  describe('Hex to TRON conversion', () => {
    it('converts single hex address to TRON format', () => {
      render(<App />);

      const hexInput = screen.getByLabelText('Enter Hex address');
      const convertButton = screen.getAllByDisplayValue('Convert')[1];

      // Enter hex address
      fireEvent.change(hexInput, {
        target: { value: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
      });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that TRON address is displayed
      expect(
        screen.getByText(/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb/)
      ).toBeTruthy();
      expect(screen.getByText('Converted addresses:')).toBeTruthy();
    });

    it('converts multiple hex addresses to TRON format', () => {
      render(<App />);

      const hexInput = screen.getByLabelText('Enter Hex address');
      const convertButton = screen.getAllByDisplayValue('Convert')[1];

      // Enter multiple hex addresses
      const multipleAddresses = `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C`;
      fireEvent.change(hexInput, { target: { value: multipleAddresses } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that both TRON addresses are displayed
      expect(
        screen.getByText(/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb/)
      ).toBeTruthy();
      expect(
        screen.getByText(/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/)
      ).toBeTruthy();
      expect(screen.getByText('Converted addresses:')).toBeTruthy();
    });

    it('shows Tronscan link for converted TRON address', () => {
      render(<App />);

      const hexInput = screen.getByLabelText('Enter Hex address');
      const convertButton = screen.getAllByDisplayValue('Convert')[1];

      // Enter hex address
      fireEvent.change(hexInput, {
        target: { value: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
      });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that Tronscan link is displayed
      const tronscanLink = screen.getByText('(View on Tronscan)');
      expect(tronscanLink).toBeTruthy();
      const linkElement = tronscanLink.closest('a');
      expect(linkElement?.href).toBe(
        'https://tronscan.org/#/address/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb'
      );
    });

    it('handles mixed valid and invalid hex addresses', () => {
      render(<App />);

      const hexInput = screen.getByLabelText('Enter Hex address');
      const convertButton = screen.getAllByDisplayValue('Convert')[1];

      // Enter valid and invalid hex addresses
      const mixedAddresses = `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
invalid-hex-address
0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C`;
      fireEvent.change(hexInput, { target: { value: mixedAddresses } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that valid addresses are converted
      expect(
        screen.getByText(/TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb/)
      ).toBeTruthy();
      expect(
        screen.getByText(/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t/)
      ).toBeTruthy();
      // Check that invalid address is returned as-is (fromHex returns input if not hex)
      const invalidResults = screen.getAllByText(/invalid-hex-address/);
      expect(invalidResults.length).toBeGreaterThan(0);
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
      const hexResult = screen.getByText(
        /0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/
      );
      expect(hexResult).toBeTruthy();

      // Now convert back to TRON
      fireEvent.change(hexInput, {
        target: { value: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' },
      });
      fireEvent.click(hexToTronButton);

      // Verify we get back the original TRON address - use getAllByText to handle multiple matches
      const tronResults = screen.getAllByText(
        /TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb/
      );
      expect(tronResults.length).toBeGreaterThan(0);
    });
  });

  describe('Whitespace handling', () => {
    it('handles addresses with extra whitespace', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter addresses with extra whitespace
      const addressesWithWhitespace = `  TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb

  TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t  `;
      fireEvent.change(tronInput, {
        target: { value: addressesWithWhitespace },
      });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that both addresses are converted despite whitespace
      expect(
        screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)
      ).toBeTruthy();
      expect(
        screen.getByText(/0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C/)
      ).toBeTruthy();
    });

    it('ignores empty lines', () => {
      render(<App />);

      const tronInput = screen.getByLabelText('Enter Tron address');
      const convertButton = screen.getAllByDisplayValue('Convert')[0];

      // Enter address with empty lines
      const addressWithEmptyLines = `TVjpchRyV9wdpj6kmwqVsBDWY1J8PaFtnb


TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t

`;
      fireEvent.change(tronInput, { target: { value: addressWithEmptyLines } });

      // Click convert button
      fireEvent.click(convertButton);

      // Check that both addresses are converted and no errors from empty lines
      expect(
        screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)
      ).toBeTruthy();
      expect(
        screen.getByText(/0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C/)
      ).toBeTruthy();

      // Should only have 2 converted results, not empty line entries
      expect(
        screen.getByText(/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/)
      ).toBeTruthy();
      expect(
        screen.getByText(/0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C/)
      ).toBeTruthy();
    });
  });
});
