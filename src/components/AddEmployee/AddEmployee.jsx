import React, { useState } from "react";
import InputsItem from "../InputsItem/InputsItem";
import { useDispatch, useSelector } from "react-redux";
import { setRootsList } from "../../store/slice/employee";
import { ref, set, push, get, update } from "firebase/database";
import { database } from "../../config/firebase";
const AddEmployee = ({ managerId, imageUrl, handelModalClose }) => {
  const { auth } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subordinates: [],
    designation: "",
    managerId: managerId,
    imageUrl: imageUrl,
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

  const handelSubordinatesChange = (e) => {
    const subordinates = Number(e.target.value) ? [e.target.value] : [];
    setFormData((preve) => ({ ...preve, subordinates: subordinates }));
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

  const addEmployee = async (formData) => {
    try {
      const employeesRef = ref(database, `users/${auth.uid}/employees/`);
      const newEmployeeRef = await push(employeesRef);
      const { name, email, managerId, designation, imageUrl } = formData;

      const newEmployee = {
        name,
        email,
        managerId,
        designation,
        imageUrl,
        id: newEmployeeRef.key,
        subordinates: [],
      };
      await set(newEmployeeRef, newEmployee);

      if (managerId) {
        try {
          const managerRef = ref(
            database,
            `users/${auth.uid}/employees/${managerId}`
          );
          const managerSnapshot = await get(managerRef);
          const managerData = managerSnapshot.val();
          if (managerData) {
            const updatedSubordinates = managerData.subordinates
              ? [...managerData.subordinates, newEmployeeRef.key]
              : [newEmployeeRef.key];
            await update(managerRef, { subordinates: updatedSubordinates });
            getData();
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        getData();
      }
      handelModalClose();
    } catch (error) {
      handelModalClose();
      console.error(error);
    }
  };

  const handelSubmit = () => {
    const { imageUrl, name, designation, email } = formData;
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

    if (email?.trim() === "") {
      setError((preve) => ({ ...preve, email: true }));
      return;
    }
    addEmployee(formData);
  };

  return (
    <div className="p-4  min-w-[400px]">
      <div className="">
        <h3 className="mb-4 text-2xl font-semibold text-center">
          Add Subordinate
        </h3>
        <div>
          <div>
            <InputsItem
              type="text"
              label={"Name"}
              value={formData.name}
              error={error.name}
              onChange={(e) => handelNameChange(e)}
              placeholder="Enter name"
            />
          </div>
          <div>
            <InputsItem
              type="text"
              label={"Manager Id"}
              value={formData.managerId}
              onChange={(e) => {}}
              disabled={true}
            />
          </div>
          <div>
            <InputsItem
              type="text"
              label={"Image Url"}
              value={formData.imageUrl}
              onChange={(e) => {}}
              disabled={true}
            />
          </div>
          <div>
            <InputsItem
              type="email"
              label={"Email"}
              value={formData.email}
              error={error.email}
              onChange={(e) => {
                handelEmailChange(e);
              }}
              placeholder="Enter email"
            />
          </div>
          <div>
            <InputsItem
              type="text"
              label={"Designation"}
              error={error.designation}
              value={formData.designation}
              onChange={(e) => {
                handelDesignationChange(e);
              }}
              placeholder="Enter designation"
            />
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
          onClick={() => handelSubmit()}
          className="font-semibold py-2 px-4 bg-green-500/75 hover:bg-green-500 rounded  text-white">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
