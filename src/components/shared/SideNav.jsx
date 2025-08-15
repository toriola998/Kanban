import BoardList from "./BoardList";
import ToggleTheme from "./ToggleTheme";

export default function SideNav() {
   return (
      <nav>
         <div className="min-h-screen fixed w-[300px] border-r border-light-grey hidden md:block z-[100] bg-white">
            <BoardList>
               <img src="/assets/logo-dark.svg" alt="" className="mb-14" />
            </BoardList>

            <div className="pr-6 w-full absolute bottom-10">
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
