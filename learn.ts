
function getUniqueElements<T>(array: T[]): T[] {
    const uniqueElements = new Set<T>(array);
    return Array.from(uniqueElements);
}
