"use client";

import { BaseContextProps } from "@/modules/common";
import { createContext, useContext, useEffect, useState } from "react";

export type RemoveLastPopupCallback = () => void;

type PopupContextData = {
  addPopup: (popup: React.ReactNode) => void;
  removeLastPopup: RemoveLastPopupCallback;
};

export const PopupContext = createContext<PopupContextData>(
  {} as PopupContextData
);

export function PopupProvider({ children }: BaseContextProps) {
  const [popupElements, setPopupElements] = useState<React.ReactNode[]>([]);

  function removeLastPopup() {
    setPopupElements((popups) => {
      popups.pop();
      return [...popups];
    });
  }

  function addPopup(popup: React.ReactNode) {
    setPopupElements((popups) => [...popups, popup]);
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
    <PopupContext.Provider value={{ addPopup, removeLastPopup }}>
      {children}
      <div id={"popups_overlay"} className="absolute top-0 left-0">
        {popupElements.map((element, index) => {
          return <div key={index}>{element}</div>;
        })}
      </div>
    </PopupContext.Provider>
  );
}

export const usePopup = () => useContext(PopupContext);
