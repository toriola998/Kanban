export default function TaskCard({
   title,
   completedSubtasks,
   totalSubtasks,
   getTask,
}) {
   return (
      <article
         className="group bg-white px-4 py-6 card-shadow rounded-lg w-full md:w-[280px] font-bold cursor-pointer"
         onClick={getTask}
      >
         <p className="text-[15px] group-hover:text-main-purple transition-colors duration-200">
            {title}
         </p>
         <p className="text-xs text-grey mt-2">
            {completedSubtasks} of {totalSubtasks} substasks
         </p>
      </article>
   );
}
