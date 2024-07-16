import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { ProtectedRoutes, PublicRoutes } from "./routes";
import ProtectedRoute from "@components/ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";

const App = () => {
  const { auth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoute userData={auth} />}>
            {ProtectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
          {PublicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
