export class SetsListErrorsKeys {
  public static unexpectedErrorInGettingList = "UnexpectedErrorInGettingList";
  public static unexpectedErrorInDeletingSets = "UnexpectedErrorInDeletingSets";
}

export const setsListErrors = new Map<string, string>([
  [SetsListErrorsKeys.unexpectedErrorInGettingList, "An unexpected error has occurred in getting the list of sets."],
  [SetsListErrorsKeys.unexpectedErrorInDeletingSets, "An unexpected error has occurred in deleting sets."],
]);
