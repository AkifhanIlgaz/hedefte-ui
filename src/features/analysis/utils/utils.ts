export function formatNumber(value: number): string {
  return value % 1 === 0 ? value.toString() : value.toFixed(2);
}
