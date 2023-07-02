import { useEffect, useState } from "react";

export interface IUseLoadingAnimationVisibilityProps {
  isLoading: boolean;
}

export function useLoadingAnimationVisibility(props: IUseLoadingAnimationVisibilityProps): boolean {
  const [isLoadingAnimationVisible, setIsLoadingAnimationVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!props.isLoading) {
      setIsLoadingAnimationVisible(false);

      return;
    }

    const timeoutId = setTimeout(() => {
      setIsLoadingAnimationVisible(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [props.isLoading]);

  return isLoadingAnimationVisible;
}
