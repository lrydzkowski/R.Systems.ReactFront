import { AxiosError } from "axios";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ErrorCodes } from "@app/models/error-codes";
import { IErrorHandlingInfo } from "@app/models/error-handling-info";
import { IErrorInfo } from "@app/models/error-info";

export class ErrorsHandler {
  public static handleErrorMessages<TFormData extends FieldValues>(
    error: unknown,
    errorCodesMapping: Map<string, IErrorHandlingInfo>,
    setError: UseFormSetError<TFormData>
  ): string[] {
    if (!ErrorsHandler.isValidationError(error)) {
      return [ErrorsHandler.getUnexpectedErrorMessage(errorCodesMapping)];
    }

    const errorMessages: string[] = ((error as AxiosError).response?.data as IErrorInfo[])
      .map((errorInfo: IErrorInfo) => {
        const key = ErrorsHandler.buildKey(errorInfo);
        if (!errorCodesMapping.has(key)) {
          return ErrorsHandler.getUnexpectedErrorMessage(errorCodesMapping);
        }

        const errorHandlingInfo = errorCodesMapping.get(key) as IErrorHandlingInfo;
        if (errorHandlingInfo.fieldName === null) {
          return errorHandlingInfo.message;
        }

        setError(
          errorHandlingInfo.fieldName as Path<TFormData>,
          { type: "custom", message: errorHandlingInfo.message },
          { shouldFocus: true }
        );
      })
      .filter((errorMessage) => errorMessage !== undefined) as string[];

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

  private static getUnexpectedErrorMessage(errorCodesMapping: Map<string, IErrorHandlingInfo>): string {
    return errorCodesMapping.get(ErrorCodes.unexpected)?.message ?? "unknown";
  }

  private static buildKey(errorInfo: IErrorInfo): string {
    return `${errorInfo.propertyName}_${errorInfo.errorCode}`;
  }

  private static unique(messages: string[]): string[] {
    return messages.filter((message, index) => messages.indexOf(message) === index);
  }
}
