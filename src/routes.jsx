import { lazy } from "react";

const Singup = lazy(() => import("@pages/Singup/Singup"));
const Manager = lazy(() => import("@pages/Manager/Manager"));

export const PublicRoutes = [{ path: "/login", element: <Singup /> }];
export const ProtectedRoutes = [{ path: "/", element: <Manager /> }];
