import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialBoards = [...data.boards];

export const boardSlice = createSlice({
   name: "boards",
   initialState: {
      boardsList: initialBoards,
      activeBoardName: initialBoards[0].name || "",
      activeTask: null, // { columnIndex, taskIndex }
   },
   reducers: {
      setActiveBoard: (state, action) => {
         state.activeBoardName = action.payload;
      },
      setActiveTask: (state, action) => {
         state.activeTask = action.payload; // { columnIndex, taskIndex }
      },
      addNewTask: (state, action) => {
         const { newTask, columnIndex } = action.payload;
         if (typeof columnIndex !== "number") return;

         const activeBoardData = state.boardsList.find(
            (board) => board.name === state.activeBoardName,
         );
         if (!activeBoardData) return;

         activeBoardData.columns[columnIndex].tasks.push(newTask);
      },

      toggleSubtask: (state, action) => {
         const { subtaskIndex } = action.payload;
         const { columnIndex, taskIndex } = state.activeTask || {};

         const activeBoardData = state.boardsList.find(
            (board) => board.name === state.activeBoardName,
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

         const activeBoardData = state.boardsList.find(
            (board) => board.name === state.activeBoardName,
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

         const activeBoardData = state.boardsList.find(
            (board) => board.name === state.activeBoardName,
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
      deleteTask: (state) => {
         const { columnIndex, taskIndex } = state.activeTask || {};

         if (typeof columnIndex !== "number" || typeof taskIndex !== "number") {
            console.warn("Invalid task position — cannot delete");
            return;
         }

         const activeBoardData = state.boardsList.find(
            (board) => board.name === state.activeBoardName,
         );
         if (!activeBoardData) return;

         activeBoardData.columns[columnIndex].tasks.splice(taskIndex, 1);
         state.activeTask = null;
      },
      createNewBoard: (state, action) => {
         const newBoard = action.payload;
         state.boardsList.push(newBoard);
         console.log(state.boardsList);
      },
      editBoard: (state, action) => {
         const { boardName, newBoardName, updatedColumns } = action.payload;

         const boardIndex = state.boardsList.findIndex(
            (b) => b.name === boardName,
         );
         if (boardIndex === -1) return; // board not found

         const board = state.boardsList[boardIndex];
         if (newBoardName && newBoardName !== boardName) {
            board.name = newBoardName;
            if (state.activeBoardName === boardName) {
               state.activeBoardName = newBoardName;
            }
         }

         // Update columns - this will remove columns that aren't in updatedColumns
         board.columns = updatedColumns.map((columnName, index) => {
            // Find existing column to preserve tasks
            const existingColumn = board.columns?.find(
               (col) => col.name === columnName,
            );

            if (existingColumn) {
               // Keep existing column but update name if changed
               return {
                  ...existingColumn,
                  name: columnName,
               };
            } else {
               // Create new column
               return {
                  name: columnName,
                  tasks: [],
               };
            }
         });
      },

      deleteBoard: (state) => {
         const idx = state.boardsList.findIndex(
            (board) => board.name === state.activeBoardName,
         );

         if (idx !== -1) {
            state.boardsList.splice(idx, 1);
            state.activeBoardName = state.boardsList[0].name;
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
   deleteTask,
   addNewTask,
   createNewBoard,
   deleteBoard,
   editBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
