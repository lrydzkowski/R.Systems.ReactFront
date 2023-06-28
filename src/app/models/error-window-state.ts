export interface IErrorWindowState {
  isOpen: boolean;
  message: string;
  onCloseEvent: (() => void) | null;
}
