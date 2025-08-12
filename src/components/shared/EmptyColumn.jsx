export default function EmptyColumn({ addColumn }) {
   return (
      <div className="flex-center min-h-screen">
         <div>
            <p className="text-center font-bold md:text-lg text-grey mb-6 max-w-[320px] mx-auto">
               This board is empty. Create a new column to get started.
            </p>
            <button
               className="btn purple px-4 py-3 gap-x-2 mx-auto"
               onClick={addColumn}
            >
               <img src="/assets/icon-add-task-mobile.svg" alt="" />
               Add New Column
            </button>
         </div>
      </div>
   );
}
