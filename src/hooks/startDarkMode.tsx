import { darkModeAtom } from "@/stateManagement/darkmode";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export default function useInitiateDarkMode() {
  const darkMode = useAtomValue(darkModeAtom);
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
}
