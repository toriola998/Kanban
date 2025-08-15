import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react"; // or wherever your Switch comes from

function ThemeToggle() {
   const [isDarkMode, setIsDarkMode] = useState(false);

   // Initialize theme on component mount
   useEffect(() => {
      // Check current theme
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
         "(prefers-color-scheme: dark)",
      ).matches;

      // Determine if dark mode should be enabled
      const shouldBeDark =
         savedTheme === "dark" || (!savedTheme && systemPrefersDark);

      setIsDarkMode(shouldBeDark);
      updateTheme(shouldBeDark);
   }, []);

   // Function to update the theme
   const updateTheme = (isDark) => {
      if (isDark) {
         document.documentElement.classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.documentElement.classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   };

   // Handle toggle change
   const handleToggleChange = (checked) => {
      setIsDarkMode(checked);
      updateTheme(checked);
   };

   return (
      <div className="bg-light-grey-1 dark:bg-dark-grey rounded-md flex-center gap-x-6 py-[14px] mx-6">
         <img src="/assets/icon-light-theme.svg" alt="" />
         <Switch
            checked={isDarkMode}
            onChange={handleToggleChange}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-main-purple p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-main-purple data-focus:outline data-focus:outline-white"
         >
            <span
               aria-hidden="true"
               className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
            />
         </Switch>
         <img src="/assets/icon-dark-theme.svg" alt="" />
      </div>
   );
}

export default ThemeToggle;
