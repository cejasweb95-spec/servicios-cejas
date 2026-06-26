"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** Evita mismatch de hidratación: Motion no aplica `initial` hasta el cliente. */
export function useClientMotionReady() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
