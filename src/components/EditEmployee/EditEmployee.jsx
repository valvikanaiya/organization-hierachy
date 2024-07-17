import React, { useState } from "react";
import InputsItem from "../InputsItem/InputsItem";
import { useDispatch, useSelector } from "react-redux";
import { get, ref, update } from "@firebase/database";
import { setRootsList } from "../../store/slice/employee";
import { database } from "../../config/firebase";

const EditEmployee = ({ employee, handelModalClose }) => {
  const { auth } = useSelector((state) => state.auth);
  const { id, name, email, imageUrl, designation } = employee;
  const [formData, setFormData] = useState({
    id,
    name,
    email,
    designation,
    imageUrl,
  });
  const [error, setError] = useState({
    name: false,
    designation: false,
    email: false,
    imageUrl: false,
  });

  const dispatch = useDispatch();
  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  const handelNameChange = (e) => {
    if (e.target.value?.trim() !== "")
      setError((preve) => ({ ...preve, name: false }));
    else setError((preve) => ({ ...preve, name: true }));

    setFormData((preve) => ({ ...preve, name: e.target.value }));
  };

  const handelEmailChange = (e) => {
    if (isValidEmail(e.target.value))
      setError((preve) => ({ ...preve, email: false }));
    else setError((preve) => ({ ...preve, email: true }));
    setFormData((preve) => ({ ...preve, email: e.target.value }));
  };

  const handelDesignationChange = (e) => {
    if (e.target.value?.trim() !== "")
      setError((preve) => ({ ...preve, designation: false }));
    else setError((preve) => ({ ...preve, designation: true }));
    setFormData((preve) => ({ ...preve, designation: e.target.value }));
  };
  const getData = async () => {
    try {
      const userRef = ref(database, `users/${auth.uid}/employees`);
      const data = await get(userRef);
      const newData = Object.values(data.val());
      dispatch(setRootsList(newData));
      handelModalClose();
    } catch (error) {
      handelModalClose();
      console.error(error, error);
    }
  };
  const handelSubmit = async () => {
    const { id, imageUrl, name, designation, email } = formData;
    if (imageUrl?.trim() === "") {
      setError((preve) => ({ ...preve, imageUrl: true }));
      return;
    }
    if (name?.trim() === "") {
      setError((preve) => ({ ...preve, name: true }));
      return;
    }
    if (designation?.trim() === "") {
      setError((preve) => ({ ...preve, designation: true }));
      return;
    }

    if (!isValidEmail(email)) {
      setError((preve) => ({ ...preve, email: true }));
      return;
    }

    try {
      const managerRef = ref(database, `users/${auth.uid}/employees/${id}`);
      const managerSnapshot = await get(managerRef);
      const managerData = managerSnapshot.val();
      if (managerData) {
        const updatedSubordinates = { name, email, designation };
        await update(managerRef, updatedSubordinates);
        getData();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="p-4  min-w-[400px]">
      <div>
        <h3 className="mb-4 text-2xl font-semibold text-center">
          Edit Manager
        </h3>
        <div>
          <InputsItem
            type="text"
            label={"Name"}
            value={formData.name}
            error={error.name}
            onChange={handelNameChange}
            placeholder="Enter name"
          />
        </div>
        <div>
          <InputsItem
            type="email"
            label={"Email"}
            value={formData.email}
            error={error.email}
            onChange={handelEmailChange}
            placeholder="Enter email"
          />
        </div>
        <div>
          <InputsItem
            type="text"
            label={"Designation"}
            value={formData.designation}
            error={error.designation}
            onChange={handelDesignationChange}
            placeholder="Enter designation"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handelModalClose()}
            className="font-semibold py-2 px-4 bg-red-500 hover:bg-red-600 text-white r rounded">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handelSubmit()}
            className="font-semibold py-2 px-4 bg-green-500/75 hover:bg-green-500 rounded  text-white">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
