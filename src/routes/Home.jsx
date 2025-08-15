import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTask, deleteTask, deleteBoard } from "../redux/boardSlice";
import Header from "../components/shared/Header";
import SideNav from "../components/shared/SideNav";
import TaskInfo from "../components/tasks/TaskInfo";
import EditTask from "../components/tasks/EditTask";
import AddNewTask from "../components/tasks/AddNewTask";
import DeleteItem from "../components/shared/DeleteItem";
import EditBoard from "../components/board/EditBoard";
import ColumnView from "../components/board/ColumnView";

function App() {
   const dispatch = useDispatch();
   const boards = useSelector((state) => state.boards.value);
   const activeBoardName = useSelector((state) => state.boards.activeBoard);

   const activeBoardData = boards.find(
      (board) => board.name === activeBoardName,
   );

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

   const toggleShowAddTask = () => setShowAddTask((prev) => !prev);
   const toggleShowEditBoard = () => setShowEditBoard((prev) => !prev);
   const toggleShowDeleteBoard = () => setShowDeleteBoard((prev) => !prev);

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
      toggleShowDeleteBoard();
      dispatch(deleteBoard());
   };

   return (
      <>
         <div className="flex w-full">
            <SideNav />
            <div className="w-full">
               <Header
                  addTask={toggleShowAddTask}
                  editBoard={toggleShowEditBoard}
                  deleteBoard={toggleShowDeleteBoard}
               />

               <main className="bg-light-grey-1 min-h-screen px-4 py-6">
                  <ColumnView
                     showEditBoard={toggleShowEditBoard}
                     handleShowTaskInfo={handleShowTaskInfo}
                  />
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
               handleClick={toggleShowAddTask}
               onAddTaskSuccess={toggleShowAddTask}
            />
         )}
         {showEditBoard && (
            <EditBoard
               handleClick={toggleShowEditBoard}
               onEditBoardSuccess={toggleShowEditBoard}
            />
         )}
         {showDeleteBoard && (
            <DeleteItem
               action="board"
               title={activeBoardData?.name}
               handleClick={toggleShowDeleteBoard}
               cancel={toggleShowDeleteBoard}
               deleteItem={handleDeleteBoard}
            />
         )}
      </>
   );
}

export default App;
