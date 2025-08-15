import { useState, useEffect } from "react";

export function useTheme() {
   const [isDarkMode, setIsDarkMode] = useState(false);

   useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)",
      ).matches;
      const shouldBeDark =
         savedTheme === "dark" || (!savedTheme && systemPrefersDark);

      setIsDarkMode(shouldBeDark);
      updateTheme(shouldBeDark);

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
         if (!localStorage.getItem("theme")) {
            const systemPrefersDark = mediaQuery.matches;
            setIsDarkMode(systemPrefersDark);
            updateTheme(systemPrefersDark);
         }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
   }, []);

   const updateTheme = (isDark) => {
      document.documentElement.classList.toggle("dark", isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
   };

   const toggleTheme = () => {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      updateTheme(newTheme);
   };

   const resetToSystem = () => {
      localStorage.removeItem("theme");
      const systemPrefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)",
      ).matches;
      setIsDarkMode(systemPrefersDark);
      updateTheme(systemPrefersDark);
   };

   return { isDarkMode, toggleTheme, resetToSystem };
}
