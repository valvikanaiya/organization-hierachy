import ProfileCard from "../ProfileCard/ProfileCard";
import Card from "../Card/Card";
const Employee = ({
  expand,
  employee,
  handelEmployeeView,
  handelModalOpen,
}) => {
  return (
    <div
      className={`flex w-full sm:w-auto items-center justify-center relative py-12 md:p-12 before:content-[''] before:h-[3rem] before:w-[0px] before:border before:absolute  before:top-[-0%] before:border-indigo-800  ${
        expand === employee.id
          ? "after:content-[''] after:h-[3rem] after:w-[0px] after:border after:absolute  after:bottom-[-0%] after:border-indigo-800 "
          : ""
      }`}>
      <Card
        className="w-full sm:w-[500px]"
        onClick={() => {
          if (employee?.subordinates?.length) handelEmployeeView(employee.id);
        }}>
        <ProfileCard
          key={employee?.id}
          img={employee?.imageUrl}
          name={employee?.name}
          designation={employee?.designation}
          email={employee?.email}
          subordinates={employee?.subordinates?.length || 0}
          addEmployee={() => handelModalOpen(employee.id)}
        />
      </Card>
    </div>
  );
};

export default Employee;
