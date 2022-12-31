export class UrlInfo {
  constructor(
    private baseUrl: string,
    private urlPath: string,
    private urlPathParameters: { [key: string]: string } = {}
  ) {}

  build(): string {
    let pathWithValues = this.urlPath;
    for (const parameterKey in this.urlPathParameters) {
      if (Object.prototype.hasOwnProperty.call(this.urlPathParameters, parameterKey)) {
        const parameter = this.urlPathParameters[parameterKey];
        pathWithValues = pathWithValues.replace(`:${parameterKey}`, encodeURIComponent(parameter));
      }
    }

    if (!pathWithValues.startsWith("/")) {
      pathWithValues = "/" + pathWithValues;
    }

    return this.baseUrl + pathWithValues;
  }
}
