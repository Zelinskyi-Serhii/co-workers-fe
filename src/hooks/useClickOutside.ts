import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
): void => {
  const handleClick = useCallback(
    (evt: any) => {
      if (ref.current && !ref.current?.contains(evt.target as Node)) {
        callback(evt);
      }
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return (): void => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};
