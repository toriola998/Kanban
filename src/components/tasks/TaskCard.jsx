export default function TaskCard({
   title,
   completedSubtasks,
   totalSubtasks,
   getTask,
}) {
   return (
      <article
         className="group bg-white dark:bg-dark-grey-1 px-4 py-6 card-shadow rounded-lg w-[280px] font-bold cursor-pointer"
         onClick={getTask}
      >
         <p className="text-[15px] dark:text-white group-hover:text-main-purple transition-colors duration-200">
            {title}
         </p>
         <p className="text-xs text-grey mt-2">
            {completedSubtasks} of {totalSubtasks} substasks
         </p>
      </article>
   );
}
