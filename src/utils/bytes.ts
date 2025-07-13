export function byte2hexStr(byte: number): string {
  if (typeof byte !== 'number') throw new Error('Input must be a number');
  if (byte < 0 || byte > 255) throw new Error('Input must be a byte');

  const hexByteMap = '0123456789ABCDEF';
  let str = '';
  str += hexByteMap.charAt(byte >> 4);
  str += hexByteMap.charAt(byte & 0x0f);

  return str;
}

export function byteArray2hexStr(byteArray: number[]): string {
  let str = '';
  for (let i = 0; i < byteArray.length; i++) str += byte2hexStr(byteArray[i]);
  return str;
}