import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   setActiveTask,
   deleteTask,
   deleteBoard,
   editBoard,
} from "../redux/boardSlice";
import Header from "../components/shared/Header";
import SideNav from "../components/shared/SideNav";
import TaskCard from "../components/tasks/TaskCard";
import TaskTitle from "../components/tasks/TaskTitle";
import TaskInfo from "../components/tasks/TaskInfo";
import EditTask from "../components/tasks/EditTask";
import AddNewTask from "../components/tasks/AddNewTask";
import DeleteItem from "../components/shared/DeleteItem";
import EditBoard from "../components/board/EditBoard";

function App() {
   const dispatch = useDispatch();
   const boards = useSelector((state) => state.boards.value);
   const activeBoardName = useSelector((state) => state.boards.activeBoard);

   const activeBoardData = boards.find(
      (board) => board.name === activeBoardName,
   );

   const columns =
      boards.find((item) => item.name === activeBoardName)?.columns || [];

   const completedTask = (arg) => {
      return arg.filter((sub) => sub.isCompleted).length;
   };

   const [showAddTask, setShowAddTask] = useState(false);
   const [showTaskInfo, setShowTaskInfo] = useState(false);
   const [showEditTask, setShowEditTask] = useState(false);
   const [showDeleteTask, setShowDeleteTask] = useState(false);
   const [task, setTask] = useState(null);
   const [showEditBoard, setShowEditBoard] = useState(false);
   const [showDeleteBoard, setShowDeleteBoard] = useState(false);

   const handleShowTaskInfo = (task, columnIndex, taskIndex) => {
      setShowTaskInfo(true);
      setTask(task);
      dispatch(setActiveTask({ columnIndex, taskIndex }));
   };
   const closeTaskInfo = () => setShowTaskInfo(false);
   const closeEditTask = () => setShowEditTask(false);
   const closeDeleteTask = () => setShowDeleteTask(false);
   const closeAddTask = () => setShowAddTask(false);
   const closeEditBoard = () => setShowEditBoard(false);
   const closeDeleteBoard = () => setShowDeleteBoard(false);

   const handleEditTask = () => {
      setShowEditTask(true);
      closeTaskInfo();
   };

   const handleShowDeleteTask = () => {
      setShowDeleteTask(true);
      closeTaskInfo();
   };

   const handleDeleteTask = () => {
      dispatch(deleteTask());
      closeDeleteTask();
   };

   const handleDeleteBoard = () => {
      closeDeleteBoard();
      dispatch(deleteBoard());
   };

   const handleShowAddTask = () => setShowAddTask(true);
   const handleShowEditBoard = () => setShowEditBoard(true);
   const handleShowDeleteBoard = () => setShowDeleteBoard(true);

   return (
      <>
         <div className="flex w-full">
            <SideNav />
            <div className="w-full">
               <Header
                  addTask={handleShowAddTask}
                  editBoard={handleShowEditBoard}
                  deleteBoard={handleShowDeleteBoard}
               />

               <main className="bg-light-grey-1 min-h-screen px-4 py-6">
                  <div className="flex gap-6">
                     {columns.map((item, columnIndex) => (
                        <div key={columnIndex} className="w-full md:w-[280px]">
                           <TaskTitle item={item} index={columnIndex} />

                           <div className="flex flex-col gap-y-6">
                              {item.tasks?.map((task, taskId) => (
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
                     <div className="new-column flex-center mt-10 max-h-screen rounded-lg">
                        <button
                           className="text-grey font-bold text-xl md:text-2xl w-[260px]"
                           onClick={handleShowEditBoard}
                        >
                           + New Column
                        </button>
                     </div>
                  </div>
               </main>
            </div>
         </div>
         {showTaskInfo && (
            <TaskInfo
               edit={handleEditTask}
               deleteItem={handleShowDeleteTask}
               handleClick={closeTaskInfo}
               onChangeStatus={closeTaskInfo}
            />
         )}
         {showEditTask && (
            <EditTask
               handleClick={closeEditTask}
               onEditSuccess={closeEditTask}
            />
         )}
         {showDeleteTask && (
            <DeleteItem
               action="task"
               title={task.title}
               handleClick={closeDeleteTask}
               cancel={closeDeleteTask}
               deleteItem={handleDeleteTask}
            />
         )}
         {showAddTask && (
            <AddNewTask
               handleClick={closeAddTask}
               onAddTaskSuccess={closeAddTask}
            />
         )}
         {showEditBoard && (
            <EditBoard
               handleClick={closeEditBoard}
               onEditBoardSuccess={closeEditBoard}
            />
         )}
         {showDeleteBoard && (
            <DeleteItem
               action="board"
               title={activeBoardData?.name}
               handleClick={closeDeleteBoard}
               cancel={closeDeleteBoard}
               deleteItem={handleDeleteBoard}
            />
         )}
      </>
   );
}

export default App;
