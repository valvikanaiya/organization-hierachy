import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ userData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData?.uid) {
      navigate("/login");
    }
  }, [userData]);
  return (
    <div>
      <Suspense fallback={<h1>Locating</h1>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default ProtectedRoute;
