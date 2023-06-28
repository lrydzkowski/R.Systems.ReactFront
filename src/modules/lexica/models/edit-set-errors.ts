export class EditSetErrorsKeys {
  public static unexpectedErrorInGettingSet = "UnexpectedErrorInGettingSet";
}

export const editSetErrors = new Map<string, string>([
  [EditSetErrorsKeys.unexpectedErrorInGettingSet, "An unexpected error has occurred in getting the set."],
]);
