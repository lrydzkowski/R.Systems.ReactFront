import { useEffect, useState } from "react";

export interface IUseFocusHandlerProps {
  isLoading: boolean;
}

export function useFocusHandler(props: IUseFocusHandlerProps): HTMLElement | null {
  const [elementToRestoreFocus, setElementToRestoreFocus] = useState<HTMLElement | null>(
    document.activeElement as HTMLElement
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFocus = (event: any) => setElementToRestoreFocus(event.target);

    window.addEventListener("focus", onFocus, true);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    if (!props.isLoading) {
      elementToRestoreFocus?.focus();
    }
  }, [props.isLoading]);

  return elementToRestoreFocus;
}
