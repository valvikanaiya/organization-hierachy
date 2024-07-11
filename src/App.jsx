import Card from "@components/Card/Card";
import ProfileCard from "./components/ProfileCard/ProfileCard";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmployeeHierarchy from "./components/EmployeHirachy/EmployeHirachy";
import ChangeManager from "./components/ChangeManager/ChangeManager";
import Modal from "./components/Modal/Modal";

function App() {
  const { employeList } = useSelector((state) => state.employee);
  const [ceo, setCeo] = useState({});
  const [substitudeList, setSubstitudeList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const newCeo = employeList?.find((item) => item.managerId === null);
    setCeo({ ...newCeo });
  }, [employeList]);

  useEffect(() => {
    const newEmployee = employeList?.filter((item) => item.managerId !== null);
    const newSubstitudeList = newEmployee?.filter((item, index) => {
      {
        if (ceo.subordinates?.includes(item.id)) {
          return item;
        }
      }
    });
    setSubstitudeList(newSubstitudeList);
  }, [ceo, employeList]);

  const handeleModalOpen = () => {
    setOpen(true);
  };
  const handelModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal onClose={handelModalClose} open={open}>
        <ChangeManager handelModalClose={handelModalClose} />
      </Modal>
      <div className="min-h-screen min-w-full bg-slate-950 p-4">
        <div className="md:w-[90%] mx-auto flex items-center justify-center relative py-12 sm:p-12 before:h-[3rem] before:w-[0px] before:border before:absolute  before:bottom-[-0%] before:border-indigo-800  border-b border-indigo-800">
          <Card className="w-full sm:w-[500px]">
            <ProfileCard
              key={ceo.id}
              img={ceo.imageUrl}
              name={ceo.name}
              designation={ceo.designation}
              email={ceo.email}
              subordinates={ceo.subordinates?.length || 0}
              editEmployee={handeleModalOpen}
            />
          </Card>
        </div>
        
          <EmployeeHierarchy substitudeList={substitudeList} />
        
      </div>
    </>
  );
}

export default App;
