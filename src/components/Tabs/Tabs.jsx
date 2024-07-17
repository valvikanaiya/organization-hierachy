import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Employee from "../Employee/Employee";
import Modal from "../Modal/Modal";
import AddEmployee from "../AddEmployee/AddEmployee";
import { setRootsList } from "../../store/slice/employee";
import { database } from "../../config/firebase";
import { get, ref, remove, update } from "@firebase/database";
import EditEmployee from "../EditEmployee/EditEmployee";

const Tabs = ({ employees }) => {
  const { employeList } = useSelector((state) => state.employee);
  console.log(employeList);
  const { auth } = useSelector((state) => state.auth);
  const [expandSet, setExpandSet] = useState(null);
  const [newEmployee, setNewEmployee] = useState([]);
  const [open, setOpen] = useState(false);
  const [managerId, setManagerId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);

  const dispatch = useDispatch();

  const filterEmployeById = (id) => {
    console.log(id);
    setExpandSet(id !== expandSet ? id : null);
    const data = employeList?.filter((item) => item.managerId === id);
    setNewEmployee(data);
  };

  const handelModalClose = () => {
    setManagerId(null);
    setOpen(false);
  };

  const handelModalOpen = (id) => {
    setManagerId(id);
    setOpen(true);
  };

  const hadelEditModalOpen = (employee) => {
    setEditEmployee(employee);
    setOpenEditModal(true);
  };
  const hadelEditModalClose = () => {
    setOpenEditModal(false);
  };

  const getData = async () => {
    try {
      const userRef = ref(database, `users/${auth.uid}/employees`);
      const data = await get(userRef);
      const newData = Object.values(data.val());
      dispatch(setRootsList(newData));
    } catch (error) {
      console.error(error, error);
    }
  };

  const handelDeleteEmployee = async (item) => {
    try {
      const employeeRef = ref(
        database,
        `users/${auth.uid}/employees/${item.id}`
      );
      await remove(employeeRef);
      if (item?.managerId) {
        try {
          const managerRef = ref(
            database,
            `users/${auth.uid}/employees/${item.managerId}`
          );
          const managerSnapshot = await get(managerRef);
          const managerData = managerSnapshot.val();

          if (managerData) {
            const updatedSubordinates = managerData.subordinates.filter(
              (ids) => ids !== item.id
            );
            await update(managerRef, { subordinates: updatedSubordinates });
            getData();
          }
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    setNewEmployee(employeList?.filter((item) => item.managerId === expandSet));
  }, [employeList, expandSet]);
  return (
    <>
      <Modal onClose={handelModalClose} open={open}>
        <AddEmployee
          managerId={managerId}
          handelModalClose={handelModalClose}
          imageUrl={"https://via.placeholder.com/150"}
        />
      </Modal>
      <Modal onClose={hadelEditModalClose} open={openEditModal}>
        <EditEmployee
          employee={editEmployee}
          handelModalClose={hadelEditModalClose}
        />
      </Modal>
      <div className="w-full">
        <div className="flex justify-center place-self-stretch  flex-wrap">
          {employees?.map((item) => (
            <div
              key={item.id}
              className={`flex  flex-wrap gap-4 ${
                item.managerId === null ? "justify-center" : "justify-between"
              }`}>
              <Employee
                expand={expandSet === item.id && item.subordinates?.length > 0}
                isrootManager={item.managerId === null}
                employee={item}
                handelEmployeeView={() => {
                  filterEmployeById(item.id);
                }}
                handelModalOpen={() => handelModalOpen(item.id)}
                deleteEmployee={
                  !item?.subordinates ? () => handelDeleteEmployee(item) : false
                }
                editEmployee={() => hadelEditModalOpen(item)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        {employees.map((item) => {
          if (item.id === expandSet && item?.subordinates?.length > 0) {
            return (
              <div className="border-t flex flex-wrap border-indigo-600">
                <Tabs
                  employees={newEmployee.filter(
                    (emp) => emp.managerId === expandSet
                  )}
                />
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Tabs;
