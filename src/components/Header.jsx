export default function Header({ title, addTask, showMenu }) {
   return (
      <header className="flex-items justify-between bg-white py-5 px-4 md:px-6 md:py-7 border-b border-light-grey">
         <div className="flex-items gap-x-4">
            <img src="/assets/logo-mobile.svg" alt="" className="md:hidden" />

            <div className="flex-items gap-x-2">
               <p className="text-black font-bold text-lg md:text-xl lg:text-2xl">
                  {title}
               </p>
               <img
                  src="/assets/icon-chevron-down.svg"
                  alt=""
                  className="md:hidden"
               />
            </div>
         </div>

         <div className="flex-items gap-x-4">
            <button className="btn purple px-4 py-2 gap-x-2">
               <img src="/assets/icon-add-task-mobile.svg" alt="" />
               <span className="hidden md:block text-sm">Add New Task</span>
            </button>

            <button>
               <img src="/assets/icon-vertical-ellipsis.svg" alt="" />
            </button>
         </div>
      </header>
   );
}
