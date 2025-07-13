import { keccak_256 } from '@noble/hashes/sha3';

/**
 * Converts an Ethereum address to its EIP-55 checksummed version.
 * @param address A hex address (with or without "0x" prefix)
 * @returns The checksummed address with "0x" prefix
 */
export function toChecksumAddress(address: string): string {
  // Remove 0x prefix if present and convert to lowercase
  const cleanAddress = address.replace(/^0x/i, '').toLowerCase();

  // Validate address format
  if (!/^[0-9a-f]{40}$/i.test(cleanAddress)) {
    throw new Error('Invalid Ethereum address format');
  }

  // Get keccak256 hash of the lowercase address
  const addressBytes = new TextEncoder().encode(cleanAddress);
  const hashBytes = keccak_256(addressBytes);

  // Convert hash bytes to hex string
  const hashHex = Array.from(hashBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  // Apply checksum: if hash character >= 8, capitalize the address character
  let checksummed = '';
  for (let i = 0; i < cleanAddress.length; i++) {
    const char = cleanAddress[i];
    const hashChar = hashHex[i];

    // If hash character is 8-f (>= 8 in hex), capitalize the address character
    if (parseInt(hashChar, 16) >= 8) {
      checksummed += char.toUpperCase();
    } else {
      checksummed += char;
    }
  }

  return '0x' + checksummed;
}

/**
 * Validates that an address has a valid EIP-55 checksum.
 * @param address A checksummed address (with "0x" prefix)
 * @returns true if valid, false otherwise
 */
export function isValidChecksumAddress(address: string): boolean {
  try {
    // If it's all lowercase or all uppercase, it's valid (no checksum applied)
    const cleanAddress = address.replace(/^0x/i, '');
    if (cleanAddress === cleanAddress.toLowerCase() || cleanAddress === cleanAddress.toUpperCase()) {
      return true;
    }

    // Otherwise, check if it matches the checksummed version
    return toChecksumAddress(address) === address;
  } catch {
    return false;
  }
}