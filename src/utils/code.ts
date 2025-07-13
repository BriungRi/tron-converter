export function isHexChar(c: string): boolean {
  return (
    (c >= 'A' && c <= 'F') ||
    (c >= 'a' && c <= 'f') ||
    (c >= '0' && c <= '9')
  );
}

export function hexChar2byte(c: string): number {
  let d: number | undefined;
  if (c >= 'A' && c <= 'F') d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  else if (c >= 'a' && c <= 'f') d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  else if (c >= '0' && c <= '9') d = c.charCodeAt(0) - '0'.charCodeAt(0);
  if (typeof d === 'number') return d;
  throw new Error('The passed hex char is not a valid hex char');
}

export function hexStr2byteArray(str: string, strict = false): number[] {
  if (typeof str !== 'string') throw new Error('The passed string is not a string');

  let len = str.length;

  if (strict) {
    if (len % 2) {
      str = `0${str}`;
      len += 1;
    }
  }

  const byteArray: number[] = [];
  let d = 0;
  let j = 0;
  let k = 0;

  for (let i = 0; i < len; i++) {
    const c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (j % 2 === 0) {
        byteArray[k++] = d;
        d = 0;
      }
    } else {
      throw new Error('The passed hex char is not a valid hex string');
    }
  }

  return byteArray;
}