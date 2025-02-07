import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "./pages/app/dashboard";
import { SignIn } from "./pages/auth/sing-in";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/sign-in", element: <SignIn /> },
]);
