import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/shared/Header";
import SideNav from "../components/shared/SideNav";
import TaskCard from "../components/tasks/TaskCard";
import TaskTitle from "../components/tasks/TaskTitle";
import TaskInfo from "../components/tasks/TaskInfo";

function App() {
   const boards = useSelector((state) => state.boards.value);
   const activeBoard = useSelector((state) => state.boards.activeBoard);

   const columns =
      boards.find((item) => item.name === activeBoard)?.columns || [];
   const completedTask = (arg) => {
      return arg.filter((sub) => sub.isCompleted).length;
   };

   const [showTaskInfo, setShowTaskInfo] = useState(false);
   const [task, setTask] = useState(null);

   const handleShowTaskInfo = (arg) => {
      setShowTaskInfo(true);
      setTask(arg);
   };

   return (
      <>
         <div className="flex w-full">
            <SideNav />
            <div className="w-full">
               <Header />

               <main className="bg-light-grey-1 min-h-screen px-4 py-6">
                  <div className="flex gap-6">
                     {columns.map((item, index) => (
                        <div key={index} className="w-full md:w-[280px]">
                           <TaskTitle item={item} index={index} />

                           <div className="flex flex-col gap-y-6">
                              {item.tasks.map((task, id) => (
                                 <TaskCard
                                    key={id}
                                    title={task.title}
                                    completedSubtasks={completedTask(
                                       task.subtasks,
                                    )}
                                    totalSubtasks={task.subtasks.length}
                                    getTask={() => handleShowTaskInfo(task)}
                                 />
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </main>
            </div>
         </div>
         {showTaskInfo && (
            <TaskInfo task={task} handleClick={() => setShowTaskInfo(false)} />
         )}
      </>
   );
}

export default App;
