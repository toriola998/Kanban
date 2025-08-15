import { useSelector } from "react-redux";
import TaskCard from "../tasks/TaskCard";
import TaskTitle from "../tasks/TaskTitle";
import EmptyColumn from "../shared/EmptyColumn";

export default function ColumnView({ showEditBoard, handleShowTaskInfo }) {
   const { boardsList, activeBoardName } = useSelector((state) => state.boards);

   const columns =
      boardsList.find((item) => item.name === activeBoardName)?.columns || [];

   const completedTask = (arg) => {
      return arg.filter((sub) => sub.isCompleted).length;
   };

   return (
      <>
         {columns.length === 0 ? (
            <EmptyColumn addColumn={showEditBoard} />
         ) : (
            <div className="flex gap-6">
               {columns.map((item, columnIndex) => (
                  <div key={columnIndex} className="w-full md:w-[280px]">
                     <TaskTitle item={item} index={columnIndex} />

                     <div className="flex flex-col gap-y-6">
                        {item.tasks?.map((task, taskId) => (
                           <TaskCard
                              key={taskId}
                              title={task.title}
                              completedSubtasks={completedTask(task.subtasks)}
                              totalSubtasks={task.subtasks.length}
                              getTask={() =>
                                 handleShowTaskInfo(task, columnIndex, taskId)
                              }
                           />
                        ))}
                     </div>
                  </div>
               ))}
               <div className="new-column flex-center mt-10 h-screen rounded-lg">
                  <button
                     className="text-grey font-bold text-xl md:text-2xl w-[260px] hover:text-main-purple"
                     onClick={showEditBoard}
                  >
                     + New Column
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
