import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@components/Tabs/Tabs";
import Card from "@components/Card/Card";
import ChangeManager from "@components/ChangeManager/ChangeManager";
import Modal from "@components/Modal/Modal";
import AddEmployee from "@components/AddEmployee/AddEmployee";
import ProfileCard from "@components/ProfileCard/ProfileCard";
import { get, ref } from "@firebase/database";
import { database } from "../../config/firebase";
import { setRootsList } from "../../store/slice/employee";
import Loader from "../../components/Loader/Loader";

const Manager = () => {
  const { auth } = useSelector((state) => state.auth);
  const { employeList } = useSelector(
    (state) => state.employee
  );

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

  const [roots, setRoots] = useState([]);
  const [ceo, setCeo] = useState({});
  const [open, setOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [isActive, setIsAvtive] = useState(false);

  useEffect(() => {
    const newCeo = employeList[0];
    setCeo({ ...newCeo });
  }, [employeList, isActive]);

  useEffect(() => {
    const newRoot = employeList?.filter((item) => item.managerId === ceo?.id);
    setRoots(newRoot);
  }, [ceo, employeList, isActive]);

  const handeleModalOpen = (e) => {
    setOpen(true);
  };

  const handelModalClose = () => {
    setOpen(false);
  };

  const handeleAddModalOpen = () => {
    setAddModal(true);
  };

  const handelAddModalClose = () => {
    setAddModal(false);
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
                      editEmployee={handeleModalOpen}
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
