"use client";

import { useMemo, useSyncExternalStore } from "react";

/** SSR-safe media-query subscription (differing server/client is handled). */
function useMediaQuery(query: string): boolean {
  const subscribe = useMemo(
    () =>
      (callback: () => void): (() => void) => {
        const mq = globalThis.matchMedia?.(query);
        if (!mq) return () => {};
        mq.addEventListener("change", callback);
        return () => mq.removeEventListener("change", callback);
      },
    [query],
  );
  const getSnapshot = useMemo(
    () => (): boolean => globalThis.matchMedia?.(query).matches ?? false,
    [query],
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Tracks `prefers-reduced-motion`, reacting if the user flips it live. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on coarse-pointer (touch) devices — used to disable parallax/hover. */
export function useIsTouch(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
