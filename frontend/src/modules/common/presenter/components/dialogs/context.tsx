"use client";

import { BaseContextProps, Overlay } from "@/modules/common";
import { createContext, useCallback, useContext, useState } from "react";

type ShowDialogOptions = { key: string };

type DialogContextData = {
  show: (element: React.ReactNode, options?: ShowDialogOptions) => void;
  removeAny: () => void;
};

export const DialogContext = createContext<DialogContextData>(
  {} as DialogContextData
);

export function DialogProvider({ children }: BaseContextProps) {
  const [activeDialogKey, setKey] = useState<string>();
  const [dialogElement, setDialogElement] = useState<React.ReactNode>();

  const show = useCallback(
    (element: React.ReactNode, options?: ShowDialogOptions) => {
      const _key = options?.key ?? "default";
      if (activeDialogKey === _key) return;

      setDialogElement(element);
      setKey(_key);
    },
    [activeDialogKey]
  );

  const removeAny = useCallback(() => {
    setDialogElement(undefined);
    setKey(undefined);
  }, []);

  const value = { show, removeAny };

  return (
    <DialogContext.Provider value={value}>
      {children}
      {dialogElement != undefined ? (
        <Overlay className="flex justify-center items-center bg-black/[.54]">
          {dialogElement}
        </Overlay>
      ) : (
        <></>
      )}
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);
