import { useState } from "react";
import { useSelector } from "react-redux";
import MobileNav from "./MobileNav";
import DropdownMenu from "./DropdownMenu";

export default function Header({ addTask, editBoard, deleteBoard }) {
   const [showMobileNav, setShowMobileNav] = useState(false);
   const { boardsList, activeBoardName } = useSelector((state) => state.boards);

   const columns =
      boardsList.find((item) => item.name === activeBoardName)?.columns || [];

   const headerStyle = `flex-items justify-between border-b border-light-grey dark:border-dark-grey-2
    fixed top-0 z-90 right-0 left-0 md:left-[300px] dark:bg-dark-grey-1 bg-white py-5 px-4 md:px-6 md:py-7 `;

   return (
      <>
         <header className={headerStyle}>
            <div className="flex-items gap-x-4">
               <img
                  src="/assets/logo-mobile.svg"
                  alt=""
                  className="md:hidden"
               />

               <div className="flex-items gap-x-2">
                  <p className="text-black dark:text-white font-bold text-lg md:text-xl lg:text-2xl">
                     {activeBoardName}
                  </p>
                  <button onClick={() => setShowMobileNav((prev) => !prev)}>
                     <img
                        src="/assets/icon-chevron-down.svg"
                        alt=""
                        className={`md:hidden transition-all ${showMobileNav ? "rotate-180" : ""}`}
                     />
                  </button>
               </div>
            </div>

            <div className="flex-items gap-x-4">
               <button
                  className={`btn purple px-4 py-2 gap-x-2
                     ${columns.length === 0 ? "!bg-light-purple !cursor-not-allowed" : ""}`}
                  onClick={addTask}
                  disabled={columns.length === 0}
               >
                  <img src="/assets/icon-add-task-mobile.svg" alt="" />
                  <span className="hidden md:block text-sm">Add New Task</span>
               </button>

               <DropdownMenu
                  edit={editBoard}
                  deleteItem={deleteBoard}
                  actionType="Board"
               />
            </div>
         </header>
         {showMobileNav && <MobileNav />}
      </>
   );
}
