import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeManager } from "@store/slice/employee";

const ChangeManager = ({ handelModalClose }) => {
  const { employeList } = useSelector((state) => state.employee);

  const [defaultManager, setDefaultManager] = useState({});
  const [newManager, setNewManager] = useState(defaultManager);

  const dispatch = useDispatch();

  const handelManagerChange = () => {
    if (newManager === null) {
      return;
    } else {
      dispatch(
        changeManager({
          manager: defaultManager,
          newManager: Number(newManager),
        })
      );
      handelModalClose();
    }
  };

  useEffect(() => {
    setNewManager(defaultManager);
  }, [defaultManager]);

  useEffect(() => {
    const manager = employeList.find((item) => item.managerId === null);
    setDefaultManager(manager.id);
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
              onChange={(e) => setNewManager(e.target.value)}
              defaultValue={defaultManager}
              value={newManager}
              id="">
              {employeList.map((employee) => (
                <option key={employee.id} value={employee.id}>
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
