import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTask } from "../redux/boardSlice";
import Header from "../components/shared/Header";
import SideNav from "../components/shared/SideNav";
import TaskCard from "../components/tasks/TaskCard";
import TaskTitle from "../components/tasks/TaskTitle";
import TaskInfo from "../components/tasks/TaskInfo";
import EditTask from "../components/tasks/EditTask";

function App() {
   const dispatch = useDispatch();
   const boards = useSelector((state) => state.boards.value);
   const activeBoard = useSelector((state) => state.boards.activeBoard);

   const columns =
      boards.find((item) => item.name === activeBoard)?.columns || [];
   const completedTask = (arg) => {
      return arg.filter((sub) => sub.isCompleted).length;
   };

   const [showTaskInfo, setShowTaskInfo] = useState(false);
   const [showEditTask, setShowEditTask] = useState(false);
   const [showDeleteTask, setShowDeleteTask] = useState(false);
   const [task, setTask] = useState(null);

   const handleShowTaskInfo = (task, columnIndex, taskIndex) => {
      setShowTaskInfo(true);
      setTask(task);
      dispatch(setActiveTask({ columnIndex, taskIndex }));
   };
   const closeTaskInfo = () => setShowTaskInfo(false);
   const closeEditTask = () => setShowEditTask(false);

   const handleEditTask = () => {
      setShowEditTask(true);
      closeTaskInfo();
   };

   const handleDeleteTask = () => {
      setShowDeleteTask(true);
      closeTaskInfo();
   };

   return (
      <>
         <div className="flex w-full">
            <SideNav />
            <div className="w-full">
               <Header />

               <main className="bg-light-grey-1 min-h-screen px-4 py-6">
                  <div className="flex gap-6">
                     {columns.map((item, columnIndex) => (
                        <div key={columnIndex} className="w-full md:w-[280px]">
                           <TaskTitle item={item} index={columnIndex} />

                           <div className="flex flex-col gap-y-6">
                              {item.tasks.map((task, taskId) => (
                                 <TaskCard
                                    key={taskId}
                                    title={task.title}
                                    completedSubtasks={completedTask(
                                       task.subtasks,
                                    )}
                                    totalSubtasks={task.subtasks.length}
                                    getTask={() =>
                                       handleShowTaskInfo(
                                          task,
                                          columnIndex,
                                          taskId,
                                       )
                                    }
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
            <TaskInfo
               edit={handleEditTask}
               deleteItem={handleDeleteTask}
               handleClick={closeTaskInfo}
            />
         )}
         {showEditTask && <EditTask handleClick={closeEditTask} />}
      </>
   );
}

export default App;
