import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialBoards = [...data.boards];

export const boardSlice = createSlice({
   name: "boards",
   initialState: {
      value: initialBoards,
      activeBoard: initialBoards[0].name || "",
      activeTask: null, // { columnIndex, taskIndex }
   },
   reducers: {
      setActiveBoard: (state, action) => {
         state.activeBoard = action.payload;
      },
      setActiveTask: (state, action) => {
         state.activeTask = action.payload; // { columnIndex, taskIndex }
      },
      toggleSubtask: (state, action) => {
         const { subtaskIndex } = action.payload;
         const { columnIndex, taskIndex } = state.activeTask || {};

         const activeBoardData = state.value.find(
            (board) => board.name === state.activeBoard,
         );

         let subtask =
            activeBoardData.columns[columnIndex].tasks[taskIndex].subtasks[
               subtaskIndex
            ];
         if (subtask) {
            subtask.isCompleted = !subtask.isCompleted;
         }
      },
   },
});

export const { setActiveBoard, setActiveTask, toggleSubtask } =
   boardSlice.actions;

export default boardSlice.reducer;
