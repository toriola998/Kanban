import { useTheme } from "../../hooks/useTheme";
import { Switch } from "@headlessui/react";

function ThemeToggle() {
   const { isDarkMode, toggleTheme } = useTheme();

   return (
      <div className="bg-light-grey-1 dark:bg-dark-grey rounded-md flex-center gap-x-6 py-[14px] mx-6">
         <img src="/assets/icon-light-theme.svg" alt="" />
         <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
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
