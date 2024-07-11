import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import AddEmployee from "../AddEmployee/AddEmployee";
import Employee from "../Employee/Employee";

const EmployeeHierarchy = ({ substitudeList }) => {
  const { employeList } = useSelector((state) => state.employee);
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(null);
  const [managerId, setManagerId] = useState(null);
  console.log(employeList);
  const handelEmployeeView = (id) => {
    setExpand(expand === id ? null : id);
    const emp = employeList?.filter((item) => item.managerId === id);
    setEmployees(emp);
  };

  const handelModalClose = () => {
    setManagerId(null);
    setOpen(false);
  };

  const handelModalOpen = (id) => {
    setManagerId(id);
    setOpen(true);
  };

  useEffect(() => {
    handelEmployeeView(expand);
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
      <div className="flex flex-wrap sm:justify-start w-full ">
        {substitudeList?.map((item) => (
          <Employee
            key={item.id}
            expand={expand}
            employee={item}
            handelEmployeeView={handelEmployeeView}
            handelModalOpen={handelModalOpen}
          />
        ))}
      </div>
      {expand && employees.length > 0 && (
        <div className="relative w-full before:w-[90%] before:left-[5%]  before:border before:absolute  before:top-[-0%] before:border-t before:border-indigo-800  ">
          <EmployeeHierarchy substitudeList={employees} />
        </div>
      )}
    </>
  );
};
export default EmployeeHierarchy;
