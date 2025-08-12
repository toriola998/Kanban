import ToggleTheme from "./ToggleTheme";

export default function SideNav() {
   const listItem = "font-bold text-[15px] py-4 px-8 flex-items gap-x-4 w-full";

   return (
      <nav className="w-[300px] border-r border-light-grey hidden md:block relative">
         <div className="px-8 pt-8 w-[inherit]">
            <img src="/assets/logo-dark.svg" alt="" />
            <p className="text-xs text-grey font-bold mt-14 mb-5">
               ALL BOARDS (3)
            </p>
         </div>
         <ul className="pr-6">
            <li className={`${listItem} text-grey`}>
               <img src="/assets/icon-board.svg" alt="" />
               Platform Launch
            </li>
            <li
               className={`${listItem} bg-main-purple text-white rounded-r-full`}
            >
               <img
                  src="/assets/icon-board.svg"
                  alt=""
                  style={{ filter: "brightness(200%) contrast(150%)" }}
               />
               Platform Launch
            </li>

            <li className={`text-main-purple ${listItem}`}>
               <img src="/assets/icon-board-purple.svg" alt="" />+ Create New
               Board
            </li>
         </ul>

         <div className="pr-6 w-full absolute bottom-40">
            <ToggleTheme />

            <button
               className={`${listItem} text-grey hover:text-main-purple hover:bg-grey-3 rounded-r-full mt-1`}
            >
               <img src="/assets/icon-hide-sidebar.svg" alt="" />
               Hide SideBar
            </button>
         </div>
      </nav>
   );
}
