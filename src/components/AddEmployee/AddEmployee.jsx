import React, { useState } from "react";
import InputsItem from "../InputsItem/InputsItem";
import { useDispatch } from "react-redux";
import { addSubordinates } from "../../store/slice/employee";

const AddEmployee = ({ id, managerId, imageUrl, handelModalClose }) => {
  const [formData, setFormData] = useState({
    id: id,
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

  const handelNameChange = (e) => {
    setFormData((preve) => ({ ...preve, name: e.target.value }));
  };

  const handelEmailChange = (e) => {
    setFormData((preve) => ({ ...preve, email: e.target.value }));
  };

  const handelSubordinatesChange = (e) => {
    const subordinates = Number(e.target.value) ? [e.target.value] : [];
    setFormData((preve) => ({ ...preve, subordinates: subordinates }));
  };

  const handelDesignationChange = (e) => {
    setFormData((preve) => ({ ...preve, designation: e.target.value }));
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
    function isValidEmail(email) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    }

    if (!isValidEmail(email)) {
      setError((preve) => ({ ...preve, email: true }));
      return;
    }

    if (email?.trim() === "") {
      setError((preve) => ({ ...preve, email: true }));
      return;
    }

    dispatch(
      addSubordinates({
        ...formData,
      })
    );
    handelModalClose();
  };

  return (
    <div className="p-4  min-w-[400px]">
      <div className="">
        <h3 className="mb-4 text-2xl font-semibold text-center">
          Add Subordinate
        </h3>
        <div>
          <div>
            <InputsItem value={id} onChange={() => {}} disabled={true} />
          </div>
          <div>
            <InputsItem
              type="text"
              label={"Name"}
              value={formData.name}
              onChange={(e) => handelNameChange(e)}
              placeholder="Enter the name"
            />
          </div>
          <div>
            <InputsItem
              type="number"
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
              onChange={(e) => {
                handelEmailChange(e);
              }}
            />
          </div>
          <div>
            <InputsItem
              type="number"
              label={"Subordinates"}
              value={formData.subordinates}
              onChange={(e) => {
                handelSubordinatesChange(e);
              }}
            />
          </div>
          <div>
            <InputsItem
              type="text"
              label={"Designation"}
              value={formData.designation}
              onChange={(e) => {
                handelDesignationChange(e);
              }}
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
          onClick={handelSubmit}
          className="font-semibold py-2 px-4 bg-green-500/75 hover:bg-green-500 rounded  text-white">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
