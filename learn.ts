
function getUniqueElements<T>(array: T[]): T[] {
    const uniqueElements = new Set<T>(array);
    return Array.from(uniqueElements);
}

function findMax<T extends number | string>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items.reduce((max, item) => (item > max ? item : max));
}

function findMax<T extends number | string>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, current) => (current > max ? current : max));
}
