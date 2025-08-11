export default function Header({ title, addTask, showMenu }) {
   return (
      <header className="flex-items justify-between bg-white py-5 px-4 border-b border-light-grey">
         <div className="flex-items gap-x-4">
            <img src="/assets/logo-mobile.svg" alt="" />

            <div className="flex-items gap-x-2">
               <p className="text-black font-bold text-lg">{title}</p>
               <img src="/assets/icon-chevron-down.svg" alt="" />
            </div>
         </div>

         <div className="flex-items gap-x-4">
            <button className="btn purple px-4 py-2">
               <img src="/assets/icon-add-task-mobile.svg" alt="" />
            </button>

            <button>
               <img src="/assets/icon-vertical-ellipsis.svg" alt="" />
            </button>
         </div>
      </header>
   );
}
