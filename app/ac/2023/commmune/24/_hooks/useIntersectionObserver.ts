import { RefObject, useEffect, useState } from "react";

export function useIntersectionObserver(
  elementRef: RefObject<Element> | null | undefined,
  { root = null, threshold = 0 }: IntersectionObserverInit
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const elem = elementRef?.current;
    if (!elem) return;

    const observerParams = { root, threshold };
    const observer = new IntersectionObserver(updateEntry, observerParams);
    observer.observe(elem);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root]);

  return entry;
}
