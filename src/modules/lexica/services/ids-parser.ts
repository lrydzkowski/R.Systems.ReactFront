export function combineIds(ids: number[]): string {
  return ids.join(",");
}

export function splitIds(ids: string): number[] {
  return ids.split(",").map((x) => parseInt(x));
}
