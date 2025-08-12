import { createSlice } from "@reduxjs/toolkit";
import data from "../../data.json";

export const boardSlice = createSlice({
   name: "boards",
   initialState: {
      value: [...data.boards],
      activeBoard: "",
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
