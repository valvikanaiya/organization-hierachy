import { createSlice } from "@reduxjs/toolkit";

const employeSlice = createSlice({
  name: "employee",
  initialState: {
    employeList: [],
  },
  reducers: {
    setRootsList: (state, actions) => {
      state.employeList = actions.payload;
    },
  },
});

export const { setRootsList } = employeSlice.actions;

export default employeSlice.reducer;
