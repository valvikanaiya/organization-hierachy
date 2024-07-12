import PlaceholderImage from "@assets/Icons/PlaceholderImage.svg";
import Edit from "@assets/Icons/Edit.svg";
import Delete from "@assets/Icons/Delete.svg";
export default function ProfileCard({
  img,
  name,
  designation,
  email,
  subordinates,
  addEmployee,
  editEmployee,
  deleteEmployee,
}) {
  const handelAddEmoloye = (e) => {
    e.stopPropagation();
    addEmployee();
  };
  const handelDeleateEmploye = (e) => {
    e.stopPropagation();
    deleteEmployee();
  };
  
  return (
    <>
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
            {subordinates < 5  && (
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-gray-200 py-2 px-4  rounded font-semibold"
                onClick={handelAddEmoloye}>
                Add
              </button>
            )}
            {editEmployee && (
              <button
                className="flex items-center justify-center p-2 rounded border-2 border-indigo-500 py-3 px-6 hover:border-indigo-600"
                onClick={() => editEmployee()}>
                <img src={Edit} className="h-4 w-4" alt="" />
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
