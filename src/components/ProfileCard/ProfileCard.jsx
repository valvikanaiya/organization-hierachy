import PlaceholderImage from "@assets/Icons/PlaceholderImage.svg";
import Edit from "@assets/Icons/Edit.svg";
import Delete from "@assets/Icons/Delete.svg";
import Add from "@assets/Icons/Add.svg";
import Change from "@assets/Icons/Change-icon.svg";
import Modal from "../Modal/Modal";
import { useState } from "react";
export default function ProfileCard({
  img,
  name,
  designation,
  email,
  subordinates,
  addEmployee,
  cangeManager,
  editEmployee,
  deleteEmployee,
}) {
  const [open, setOpen] = useState(false);
  const handelAddEmoloye = (e) => {
    e.stopPropagation();
    addEmployee();
  };
  const openDeleteModal = () => {
    setOpen(true);
  };
  const handelDeleateEmploye = (e) => {
    e.stopPropagation();
    openDeleteModal();
  };
  const handelEdit = (e) => {
    e.stopPropagation();
    editEmployee();
  };

  const handelModalClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal onClose={handelModalClose} open={open}>
        <div className="p-6">
          <div className="text-center text-xl mb-4 font-semibold">
            Are you sore you want to delete manager?
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              className="bg-green-600 py-3 px-4 rounded text-white"
              onClick={() => deleteEmployee()}>
              Calcel
            </button>
            <button
              className="bg-red-600 py-3 px-4 rounded text-white"
              onClick={() => deleteEmployee()}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div className="grid h-full grid-cols-1 md:grid-cols-8 gap-4 bg-slate-800 ring-1 hover:bg-slate-900 transition-all">
        <div
          className={`h-40 md:h-auto md:col-span-3 bg-indigo-400 flex items-start justify-center ${
            img ? "" : "p-4"
          }`}>
          <img
            className="w-full object-cover h-full"
            src={img || PlaceholderImage}
            onError={(e) => (e.target.src = PlaceholderImage)}
            alt=""
          />
        </div>
        <div className="md:col-span-5 p-4 flex gap-4 flex-col">
          <div>
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              {name}
            </h2>
            <p className="text-gray-200">
              <span className="font-semibold">Designation : </span>
              <span>{designation}</span>
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Email : </span>
              <span>{email}</span>
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Subordinates : </span>
              <span>{subordinates}</span>
            </p>
          </div>
          <div className="flex items-center justify-between">
            {subordinates < 5 && (
              <button
                className="bg-indigo-600 rounded border-2 border-indigo-600 hover:bg-indigo-700 text-gray-200   font-semibold  py-3 px-6"
                onClick={handelAddEmoloye}>
                <img src={Add} className="h-4 w-4" alt="" />
              </button>
            )}
            {editEmployee && (
              <button
                className="flex items-center justify-center p-2 rounded border-2 border-indigo-500 py-3 px-6 hover:border-indigo-600"
                onClick={handelEdit}>
                <img src={Edit} className="h-4 w-4" alt="" />
              </button>
            )}
            {cangeManager && (
              <button
                className="flex items-center justify-center p-2 rounded border-2 border-indigo-500 py-3  text-white font-semibold px-6 hover:border-indigo-600"
                onClick={handelEdit}>
                <img src={Change} className="h-4 w-4" alt="" />
              </button>
            )}
            {deleteEmployee && (
              <button
                className="flex items-center justify-center p-2 rounded border-2 border-red-500 bg-red-500 py-3 px-4 hover:border-red-600"
                onClick={handelDeleateEmploye}>
                <img src={Delete} className="h-4 w-4" alt="" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
