import BoardList from "./BoardList";
import ToggleTheme from "./ToggleTheme";

export default function MobileNav() {
   return (
      <div className="modal-layout px-4">
         <div className="bg-white w-full relative rounded-lg modal-inner max-w-[284px] mx-auto pb-4 top-24">
            <BoardList />
            <div className="mt-4">
               <ToggleTheme />
            </div>
         </div>
      </div>
   );
}
