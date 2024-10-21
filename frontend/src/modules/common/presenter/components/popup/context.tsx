"use client";

import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useEffect, useState } from "react";

export type RemoveLastPopupCallback = () => void;

type PopupEntry = {
  element: React.ReactNode;
  key: string;
};

type PopupContextData = {
  popupEntries: PopupEntry[];
  addPopup: (popup: React.ReactNode, key: string) => void;
  removeLastPopup: RemoveLastPopupCallback;
};

export const PopupContext = createContext<PopupContextData>(
  {} as PopupContextData
);

export function PopupProvider({ children }: BaseContextProps) {
  const [popupEntries, setPopupEntries] = useState<PopupEntry[]>([]);
  const keys = popupEntries.map((entry) => entry.key);

  function removeLastPopup() {
    setPopupEntries((popups) => {
      popups.pop();
      return [...popups];
    });
  }

  function addPopup(popup: React.ReactNode, key: string) {
    if (keys.includes(key)) {
      return;
    }

    setPopupEntries((popups) => [...popups, { element: popup, key }]);
  }

  useEffect(() => {
    function clickListener(e: MouseEvent) {
      if (!e.target) return;

      const popup = document.getElementById("popup");
      if (!popup) return;

      if (!popup.contains(e.target as Node)) {
        // Clicked outside the popup
        removeLastPopup();
      }
    }

    window.addEventListener("click", clickListener);

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, []);

  return (
    <PopupContext.Provider value={{ popupEntries, addPopup, removeLastPopup }}>
      {children}
      <div id={"popups_overlay"} className="absolute top-0 left-0">
        {popupEntries.map((entry, index) => {
          return <div key={`${entry.key}_${index}`}>{entry.element}</div>;
        })}
      </div>
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);
