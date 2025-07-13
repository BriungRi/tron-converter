declare module "ethereum-checksum-address" {
  /**
   * Converts an Ethereum address to its EIP-55 checksummed version.
   * @param address A lowercase or uppercase hex address (with or without "0x").
   * @returns The checksummed address (with "0x" prefix).
   */
  export function toChecksumAddress(address: string): string;

  /**
   * Validates that an address has a valid EIP-55 checksum.
   * @param address A checksummed address (with "0x" prefix).
   * @returns true if valid, false otherwise.
   */
  export function isChecksumAddress(address: string): boolean;
}
