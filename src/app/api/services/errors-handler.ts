import { AxiosError } from "axios";
import { ErrorCodes } from "@app/models/error-codes";
import { IErrorInfo } from "@app/models/error-info";

export class ErrorsHandler {
  public static getErrorMessages(error: unknown, errorCodesMapping: Map<string, string>): string[] {
    if (!ErrorsHandler.isValidationError(error)) {
      return [ErrorsHandler.getUnexpectedErrorMessage(errorCodesMapping)];
    }

    const errorMessages = ((error as AxiosError).response?.data as IErrorInfo[]).map((errorInfo: IErrorInfo) => {
      const key = ErrorsHandler.buildKey(errorInfo);
      if (!errorCodesMapping.has(key)) {
        return ErrorsHandler.getUnexpectedErrorMessage(errorCodesMapping);
      }

      return errorCodesMapping.get(key) as string;
    });

    return ErrorsHandler.unique(errorMessages);
  }

  private static isValidationError(error: unknown): boolean {
    return (
      error instanceof AxiosError &&
      error.response !== undefined &&
      error.response.status === 422 &&
      Array.isArray(error.response.data)
    );
  }

  private static getUnexpectedErrorMessage(errorCodesMapping: Map<string, string>): string {
    return errorCodesMapping.get(ErrorCodes.unexpected) ?? "unknown";
  }

  private static buildKey(errorInfo: IErrorInfo): string {
    return `${errorInfo.propertyName}_${errorInfo.errorCode}`;
  }

  private static unique(messages: string[]): string[] {
    return messages.filter((message, index) => messages.indexOf(message) === index);
  }
}
