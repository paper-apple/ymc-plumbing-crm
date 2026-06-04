export function getFieldClasses(hasError: boolean) {
  return `border p-2 rounded w-full ${
    hasError ? "border-red-500 bg-red-50" : "border-black"
  }`;
}