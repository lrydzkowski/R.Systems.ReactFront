export function encodePaths(paths: string[]): string {
  return encodeURIComponent(paths.join("|"));
}

export function decodePaths(encodedPaths: string): string[] {
  return decodeURIComponent(encodedPaths).split("|");
}
