import React, { useEffect, useState } from "react";
import { employeeData } from "../../utils/utils";
import Employee from "../Employee/Employee";
import Modal from "../Modal/Modal";
import AddEmployee from "../AddEmployee/AddEmployee";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee } from "../../store/slice/employee";

const Tabs = ({ employees }) => {
  const { employeList } = useSelector((state) => state.employee);
  const [expand, setExpand] = useState();
  const [newEployee, setNewEmployee] = useState();
  const [open, setOpen] = useState(false);
  const [managerId, setManagerId] = useState(null);

  const dispatch = useDispatch();

  const filterEmployeById = (id) => {
    setExpand(id === expand ? null : id);
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

  const handelDeleteEmployee = (item) => {
    dispatch(deleteEmployee(item));
  };

  useEffect(() => {
    filterEmployeById(expand);
  }, [employeList]);

  return (
    <>
      <Modal onClose={handelModalClose} open={open}>
        <AddEmployee
          id={employeList?.length + 1}
          managerId={managerId}
          handelModalClose={handelModalClose}
          imageUrl={"https://via.placeholder.com/150"}
        />
      </Modal>
      <div className="w-full">
        <div className="flex flex-wrap">
          {employees?.map((item) => (
            <div
              key={item.id}
              className={`flex flex-wrap gap-2 ${
                item.managerId === null ? "justify-center" : "justify-between"
              }`}>
              <Employee
                expand={expand === item.id}
                isrootManager={item.managerId === null}
                employee={item}
                handelEmployeeView={() => filterEmployeById(item.id)}
                handelModalOpen={() => handelModalOpen(item.id)}
                deleteEmployee={
                  item?.subordinates?.length === 0
                    ? () => handelDeleteEmployee(item)
                    : false
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        {expand && (
          <div className="border-t border-indigo-600 ">
            <Tabs key={Math.random(1, 100) * 100} employees={newEployee} />
          </div>
        )}
      </div>
    </>
  );
};

export default Tabs;
