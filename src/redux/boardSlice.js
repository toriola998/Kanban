import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

const initialBoards = [...data.boards];

export const boardSlice = createSlice({
   name: "boards",
   initialState: {
      value: initialBoards,
      activeBoard: initialBoards[0].name || "",
   },
   reducers: {
      setActiveBoard: (state, action) => {
         state.activeBoard = action.payload;
         console.log(action.payload);
      },
   },
});

export const { setActiveBoard } = boardSlice.actions;

export default boardSlice.reducer;
