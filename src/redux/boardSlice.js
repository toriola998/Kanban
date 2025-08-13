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
      updateTaskInfo: (state, action) => {
         const updatedFields = action.payload;
         const { columnIndex, taskIndex } = state.activeTask || {};

         const activeBoardData = state.value.find(
            (board) => board.name === state.activeBoard,
         );
         if (!activeBoardData) return;

         const currentTask =
            activeBoardData.columns[columnIndex].tasks[taskIndex];

         // If status changes → move to another column
         if (
            updatedFields.status &&
            updatedFields.status.toLowerCase() !==
               currentTask.status.toLowerCase()
         ) {
            // Remove from current column
            const [movedTask] = activeBoardData.columns[
               columnIndex
            ].tasks.splice(taskIndex, 1);

            const targetColumn = activeBoardData.columns.find(
               (col) =>
                  col.name.toLowerCase() === updatedFields.status.toLowerCase(),
            );

            // Push into target column with merged updates
            if (targetColumn) {
               targetColumn.tasks.push({
                  ...movedTask,
                  ...updatedFields,
               });
            }
         } else {
            // Just merge updates in place
            activeBoardData.columns[columnIndex].tasks[taskIndex] = {
               ...currentTask,
               ...updatedFields,
            };
         }
      },
   },
});

export const {
   setActiveBoard,
   setActiveTask,
   toggleSubtask,
   updateTaskStatus,
   updateTaskInfo,
} = boardSlice.actions;

export default boardSlice.reducer;
