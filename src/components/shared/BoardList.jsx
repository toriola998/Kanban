import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";

export default function BoardList({ children }) {
   const boards = useSelector((state) => state.boards.value);
   const boardsList = boards.map((item) => item.name);

   const dispatch = useDispatch();
   const activeBoard = useSelector((state) => state.boards.activeBoard);

   return (
      <>
         <div className="px-8 pt-8 w-[inherit]">
            {children}
            <p className="text-xs text-grey font-bold mb-5">ALL BOARDS (3)</p>
         </div>
         <ul className="pr-6">
            {boardsList.map((item, index) => (
               <li key={index}>
                  <button
                     className={`text-grey list-item rounded-r-full cursor-pointer
                        ${item === activeBoard ? "bg-main-purple text-white" : ""}`}
                     onClick={() => {
                        dispatch(setActiveBoard(item));
                     }}
                  >
                     <img
                        src="/assets/icon-board.svg"
                        alt=""
                        className={item === activeBoard ? "active-board" : ""}
                     />
                     {item}
                  </button>
               </li>
            ))}

            <li>
               <button className="text-main-purple list-item">
                  <img src="/assets/icon-board-purple.svg" alt="" />+ Create New
                  Board
               </button>
            </li>
         </ul>
      </>
   );
}
