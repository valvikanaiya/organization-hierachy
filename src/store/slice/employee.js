import { createSlice } from "@reduxjs/toolkit";
import { employeeData } from "../../utils/utils";

const initialState = employeeData;
const employeSlice = createSlice({
  name: "employee",
  initialState: {
    employeList: initialState,
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
    },
    deleteEmployee: (state, actions) => {
      let newState = JSON.parse(JSON.stringify(state)).employeList;
      const { id, managerId } = actions.payload;
      console.log(managerId, id);
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

      newState = newState?.map((item) => {
        if (item.managerId === manager) {
          return { ...item, managerId: newManager };
        } else if (item.managerId === newManager) {
          return { ...item, managerId: manager };
        } else {
          return { ...item };
        }
      });

      let newManagersubordinates =
        newState?.find((item) => item.id === newManager)?.subordinates || null;
      console.log(newManagersubordinates);

      let managersubordinates =
        newState?.find((item) => item.id === manager)?.subordinates || null;
      managersubordinates = managersubordinates?.filter(
        (item) => item !== newManager
      );

      if (manager === newManager) return;
      const setManager = newState?.map((item) => {
        if (item.id === manager) {
          return {
            ...item,
            managerId: newManager,
            subordinates: [...newManagersubordinates],
          };
        } else if (item.id === newManager) {
          return {
            ...item,
            managerId: null,
            subordinates: [...managersubordinates, manager],
          };
        } else {
          return { ...item, subordinates: [...item.subordinates] };
        }
      });
      state.employeList = setManager;
    },
  },
});

export const { addSubordinates, changeManager, deleteEmployee } =
  employeSlice.actions;

export default employeSlice.reducer;
