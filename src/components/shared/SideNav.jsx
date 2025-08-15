import BoardList from "./BoardList";
import ToggleTheme from "./ToggleTheme";

export default function SideNav() {
   const navBar = `min-h-screen fixed w-[300px] border-r border-light-grey
   dark:border-dark-grey-2 hidden md:block z-[100] bg-white dark:bg-dark-grey-1`;

   return (
      <nav>
         <div className={navBar}>
            <BoardList>
               <img
                  src="/assets/logo-dark.svg"
                  alt=""
                  className="mb-14 dark:hidden"
               />
               <img
                  src="/assets/logo-light.svg"
                  alt=""
                  className="mb-14 hidden dark:block"
               />
            </BoardList>

            <div className="pr-6 w-full absolute bottom-10 mt-14">
               <ToggleTheme />
               {/* <button className="text-grey hover:text-main-purple hover:bg-grey-3 rounded-r-full mt-1 list-item">
                  <img src="/assets/icon-hide-sidebar.svg" alt="" />
                  Hide SideBar
               </button> */}
            </div>
         </div>
      </nav>
   );
}
