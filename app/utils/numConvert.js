// @flow
export function convertStrToNum(strValue: string): number {
  return formatNumber(parseFloat(strValue));
}

export function convertStrToNumAndSum(
  strValue1: string,
  strValue2: string
): number {
  return formatNumber(parseFloat(strValue1) + parseFloat(strValue2));
}

export function formatNumber(num: number, p: integer = 4): number {
  return num.toFixed(p);
}
