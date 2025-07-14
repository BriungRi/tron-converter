import { sha256 } from '@noble/hashes/sha2';
import { byteArray2hexStr } from './bytes';
import { hexStr2byteArray } from './code';
import { encode58, decode58 } from './base58';

const ADDRESS_PREFIX = '41';

function isHex(str: string): boolean {
  return (
    typeof str === 'string' &&
    !isNaN(parseInt(str, 16)) &&
    /^(0x|)[a-fA-F0-9]+$/.test(str)
  );
}

function SHA256(msgBytes: number[]): number[] {
  const hashBytes = sha256(new Uint8Array(msgBytes));
  return Array.from(hashBytes);
}

function getBase58CheckAddress(addressBytes: number[]): string {
  const hash0 = SHA256(addressBytes);
  const hash1 = SHA256(hash0);

  let checkSum = hash1.slice(0, 4);
  checkSum = addressBytes.concat(checkSum);

  return encode58(checkSum);
}

function decodeBase58Address(base58Sting: string): number[] {
  if (typeof base58Sting !== 'string')
    throw new Error('Address must be a string');
  if (base58Sting.length <= 4) throw new Error('Invalid base58 address');

  let address = decode58(base58Sting);
  if (base58Sting.length <= 4) throw new Error('Invalid base58 address');

  const len = address.length;
  const offset = len - 4;
  const checkSum = address.slice(offset);

  address = address.slice(0, offset);

  const hash0 = SHA256(address);
  const hash1 = SHA256(hash0);
  const checkSum1 = hash1.slice(0, 4);

  if (
    checkSum[0] === checkSum1[0] &&
    checkSum[1] === checkSum1[1] &&
    checkSum[2] === checkSum1[2] &&
    checkSum[3] === checkSum1[3]
  ) {
    return address;
  }

  throw new Error('Invalid address provided');
}

// Public helpers
export function fromHex(address: string): string {
  if (!isHex(address)) return address;
  return getBase58CheckAddress(
    hexStr2byteArray(address.replace(/^0x/, ADDRESS_PREFIX))
  );
}

export function toHex(address: string): string {
  if (isHex(address))
    return address.toLowerCase().replace(/^0x/, ADDRESS_PREFIX);
  return byteArray2hexStr(decodeBase58Address(address)).toLowerCase();
}
