import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRootsList } from "../../store/slice/employee";
import { get, ref, update } from "@firebase/database";
import { database } from "../../config/firebase";

const ChangeManager = ({ handelModalClose }) => {
  const { employeList } = useSelector((state) => state.employee);
  const { auth } = useSelector((state) => state.auth);

  const [defaultManager, setDefaultManager] = useState({});
  const [newManager, setNewManager] = useState(defaultManager);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const userRef = ref(database, `users/${auth.uid}/employees`);
      const data = await get(userRef);
      if (data.exists()) {
        const newData = Object?.values(data?.val());
        dispatch(setRootsList(newData));
      } else {
        dispatch(setRootsList([]));
      }
    } catch (error) {
      console.error(error, error);
    }
  };

  const handelManagerChange = async () => {
    if (newManager === null) {
      return;
    } else {
      if (defaultManager.id && newManager.id) {
        try {
          const dmRef = ref(
            database,
            `users/${auth.uid}/employees/${defaultManager.id}`
          );
          const dmanagerSnapshot = await get(dmRef);
          const dmanagerData = dmanagerSnapshot.val();

          if (dmanagerData) {
            const updatedSubordinates = {
              name: newManager.name,
              email: newManager.email,
              designation: newManager.designation,
            };
            await update(dmRef, updatedSubordinates);
            getData();
          }
          const nmRef = ref(
            database,
            `users/${auth.uid}/employees/${newManager.id}`
          );
          const nmanagerSnapshot = await get(nmRef);
          const nmanagerData = nmanagerSnapshot.val();

          if (nmanagerData) {
            const updatedSubordinates = {
              name: defaultManager.name,
              email: defaultManager.email,
              designation: defaultManager.designation,
            };
            await update(nmRef, updatedSubordinates);
          }
          getData();
        } catch (error) {
          console.error(error);
        }
      }
      handelModalClose();
    }
  };

  useEffect(() => {
    setNewManager(defaultManager);
  }, [defaultManager]);

  useEffect(() => {
    const manager = employeList[0];
    setDefaultManager(manager);
  }, [employeList]);

  return (
    <div className="p-4  min-w-[400px]">
      <div className="">
        <h3 className="mb-4 text-2xl font-semibold text-center">
          Change Manager
        </h3>
        <div className="mb-2">
          <div>
            <select
              className="w-full border p-2 rounded focus:outline-none focus:-outline-offset-0 focus:ring-1 focus:outline-indigo-600"
              name=""
              onChange={(e) => setNewManager(JSON.parse(e.target.value))}
              defaultValue={defaultManager}
              value={newManager}
              id="">
              {employeList.map((employee) => (
                <option key={employee.id} value={JSON.stringify(employee)}>
                  {employee.email}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => handelModalClose()}
          className="font-semibold py-2 px-4 bg-red-500 hover:bg-red-600 text-white r rounded">
          Close
        </button>
        <button
          type="button"
          onClick={handelManagerChange}
          className="font-semibold py-2 px-4 bg-green-500/75 hover:bg-green-500 rounded  text-white">
          Change
        </button>
      </div>
    </div>
  );
};

export default ChangeManager;
