import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@components/Tabs/Tabs";
import Card from "@components/Card/Card";
import ChangeManager from "@components/ChangeManager/ChangeManager";
import Modal from "@components/Modal/Modal";
import AddEmployee from "@components/AddEmployee/AddEmployee";
import ProfileCard from "@components/ProfileCard/ProfileCard";
import { get, ref, remove, update } from "@firebase/database";
import { database } from "../../config/firebase";
import { setRootsList } from "../../store/slice/employee";
import Loader from "../../components/Loader/Loader";
import EditEmployee from "../../components/EditEmployee/EditEmployee";

const Manager = () => {
  const { auth } = useSelector((state) => state.auth);
  const { employeList } = useSelector((state) => state.employee);
  const [roots, setRoots] = useState([]);
  const [ceo, setCeo] = useState({});
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [isActive, setIsAvtive] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      setIsLoading(true);
      const userRef = ref(database, `users/${auth.uid}/employees`);
      const data = await get(userRef);
      const newData = Object.values(data.val());
      dispatch(setRootsList(newData));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error, error);
    }
  };

  useEffect(() => {
    getData();
  }, [auth]);
  const handelDeleteEmployee = async (item) => {
    try {
      const employeeRef = ref(
        database,
        `users/${auth.uid}/employees/${item.id}`
      );
      const employeeSnapshot = await get(employeeRef);
      const employee = employeeSnapshot.val();

      if (
        employee &&
        employee.subordinates &&
        employee.subordinates.length > 0
      ) {
        for (const subId of employee.subordinates) {
          const payload = { id: subId, managerId: item.id };
          await handelDeleteEmployee(payload); // Recursively delete each subordinate
        }
      }

      // Delete the employee node
      await remove(employeeRef);

      // Update parent's subordinates list
      if (item.managerId) {
        const parentRef = ref(
          database,
          `users/${auth.uid}/employees/${item.managerId}`
        );
        const parentSnapshot = await get(parentRef);
        const parent = parentSnapshot.val();

        if (parent && parent.subordinates) {
          const updatedSubordinates = parent.subordinates.filter(
            (subId) => subId !== item.id
          );
          await update(parentRef, { subordinates: updatedSubordinates });
        }
      }
      getData();
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    const newCeo = employeList[0];
    setCeo({ ...newCeo });
  }, [employeList, isActive]);

  useEffect(() => {
    const newRoot = employeList?.filter((item) => item.managerId === ceo?.id);
    setRoots(newRoot);
  }, [ceo, employeList, isActive]);

  const handeleModalOpen = () => {
    setOpen(true);
  };

  const handelModalClose = () => {
    setOpen(false);
  };

  const handeleAddModalOpen = () => {
    setAddModal(true);
  };

  const handelAddModalClose = () => {
    setIsAvtive(true);
    setAddModal(false);
  };

  const hadelEditModalOpen = (employee) => {
    setEditEmployee(employee);
    setOpenEditModal(true);
  };

  const hadelEditModalClose = () => {
    setOpenEditModal(false);
  };
  return (
    <>
      <Modal onClose={handelModalClose} open={open}>
        <ChangeManager handelModalClose={handelModalClose} />
      </Modal>
      <Modal onClose={handelAddModalClose} open={addModal}>
        <AddEmployee
          managerId={ceo.id || null}
          handelModalClose={handelAddModalClose}
          imageUrl={"https://via.placeholder.com/150"}
        />
      </Modal>
      <Modal onClose={hadelEditModalClose} open={openEditModal}>
        <EditEmployee
          employee={editEmployee}
          handelModalClose={hadelEditModalClose}
        />
      </Modal>
      <div className="min-h-screen min-w-full bg-slate-950  p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {employeList && employeList?.length === 0 ? (
              <button
                className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  text-white font-semibold bg-indigo-700 hover:bg-indigo-800 transition-all py-2 px-4 rounded"
                onClick={handeleAddModalOpen}>
                Add Manager
              </button>
            ) : (
              <div className="md:px-0 px-3 md:w-[99%] mx-auto">
                <div
                  className={`w-full mx-auto flex-wrap flex items-center justify-center relative py-12 sm:p-12 ${
                    isActive &&
                    ceo.subordinates &&
                    ceo.subordinates?.length !== 0
                      ? "before:h-[3rem] before:w-[0px] before:border before:absolute  before:bottom-[-0%] before:border-indigo-800  border-b border-indigo-800"
                      : ""
                  }`}>
                  <Card
                    className="w-full  sm:w-[500px]"
                    onClick={() => setIsAvtive(!isActive)}>
                    <ProfileCard
                      key={ceo.id}
                      img={ceo.imageUrl}
                      name={ceo.name}
                      designation={ceo.designation}
                      email={ceo.email}
                      addEmployee={handeleAddModalOpen}
                      subordinates={ceo.subordinates?.length || 0}
                      editEmployee={() => hadelEditModalOpen(ceo)}
                      cangeManager={handeleModalOpen}
                      deleteEmployee={() => {
                        handelDeleteEmployee(ceo);
                      }}
                    />
                  </Card>
                </div>
                {roots && isActive && <Tabs employees={roots} />}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Manager;
