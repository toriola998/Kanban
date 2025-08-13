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
      updateTaskStatus: (state, action) => {
         const { columnIndex, taskIndex } = state.activeTask || {};
         const newStatus = action.payload;

         const activeBoardData = state.value.find(
            (board) => board.name === state.activeBoard,
         );

         if (!activeBoardData) return;

         // Remove task from old column
         const [movedTask] = activeBoardData.columns[columnIndex].tasks.splice(
            taskIndex,
            1,
         );
         if (!movedTask) return;

         movedTask.status = newStatus;

         const targetColumn = activeBoardData.columns.find(
            (col) => col.name.toLowerCase() === newStatus.toLowerCase(),
         );

         if (targetColumn) {
            targetColumn.tasks.push(movedTask);
         }
      },
   },
});

export const {
   setActiveBoard,
   setActiveTask,
   toggleSubtask,
   updateTaskStatus,
} = boardSlice.actions;

export default boardSlice.reducer;
