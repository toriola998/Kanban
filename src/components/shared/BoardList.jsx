import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";
import AddNewBoard from "../board/AddNewBoard";

export default function BoardList({ children }) {
   const { boardsList, activeBoardName } = useSelector((state) => state.boards);
   const boardNames = boardsList.map((item) => item.name);

   const dispatch = useDispatch();
   const [showCreateBoard, setShowCreateBoard] = useState(false);
   const toggleCreateBoard = () => setShowCreateBoard((prev) => !prev);

   return (
      <>
         <div className="px-8 pt-8 w-[inherit]">
            {children}
            <p className="text-xs text-grey font-bold mb-5">
               ALL BOARDS ({boardNames?.length})
            </p>
         </div>
         <ul className="pr-6">
            {boardNames.map((item, index) => (
               <li key={index}>
                  <button
                     className={`board-btn truncate w-32
                        ${item === activeBoardName ? "bg-main-purple text-white" : "text-grey"}`}
                     onClick={() => {
                        dispatch(setActiveBoard(item));
                     }}
                  >
                     <img
                        src="/assets/icon-board.svg"
                        alt=""
                        className={`board-icon ${item === activeBoardName ? "active-board" : ""}`}
                     />
                     {item}
                  </button>
               </li>
            ))}
         </ul>
         <button
            className="text-main-purple list-item"
            onClick={toggleCreateBoard}
         >
            <img src="/assets/icon-board-purple.svg" alt="" />+ Create New Board
         </button>
         {showCreateBoard && (
            <AddNewBoard
               handleClick={toggleCreateBoard}
               onCreateBoardSuccess={toggleCreateBoard}
            />
         )}
      </>
   );
}
