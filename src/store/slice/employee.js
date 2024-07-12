import { createSlice } from "@reduxjs/toolkit";

const employeSlice = createSlice({
  name: "employee",
  initialState: {
    employeList: [],
    employeIdcounter: 1,
  },
  reducers: {
    addSubordinates: (state, actions) => {
      const data = actions.payload;
      const managerId = data.managerId;

      state.employeList.push(actions.payload);

      state.employeList = state.employeList.map((item) => {
        if (item.id === managerId) {
          return {
            ...item,
            subordinates: [...item?.subordinates, data.id],
          };
        } else return item;
      });

      state.employeIdcounter = state.employeIdcounter + 1;
    },
    deleteEmployee: (state, actions) => {
      let newState = JSON.parse(JSON.stringify(state)).employeList;

      const { id, managerId } = actions.payload;

      let removeForParentManager = newState.filter((item) => {
        if (item.id !== id) {
          return { ...item };
        }
      });

      removeForParentManager = removeForParentManager.map((item) => {
        if (item.id === managerId) {
          const removeSubstitudes = item.subordinates.filter(
            (item) => item !== id
          );
          return { ...item, subordinates: [...removeSubstitudes] };
        } else return { ...item };
      });

      state.employeList = removeForParentManager;
    },
    changeManager: (state, actions) => {
      const { manager, newManager } = actions.payload;

      let newState = JSON.parse(JSON.stringify(state)).employeList;

      const getNewManager = newState.find((item) => item.id === newManager);

      const getManager = newState.find((item) => item.id === manager);

      newState = newState.map((item) => {
        if (item.id === newManager) {
          return {
            ...item,
            name: getManager.name,
            email: getManager.email,
            designation: getManager.designation,
          };
        } else if (item.id === manager) {
          return {
            ...item,
            name: getNewManager.name,
            email: getNewManager.email,
            designation: getNewManager.designation,
          };
        } else {
          return { ...item };
        }
      });

      state.employeList = newState;
    },
  },
});

export const { addSubordinates, changeManager, deleteEmployee } =
  employeSlice.actions;

export default employeSlice.reducer;
