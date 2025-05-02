
```typescript
function flattenArray<T>(nestedArray: (T | T[])[]): T[] {
  const result: T[] = [];
  nestedArray.forEach(item => {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  });
  return result;
}
```
