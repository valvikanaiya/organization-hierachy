import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ userData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData?.uid) {
      navigate("/login");
    }
  }, [userData]);
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default ProtectedRoute;
