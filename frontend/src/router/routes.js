import Home from "../pages/Home";
import NewPassword from "../pages/NewPassword";

export const routes = [
  {
    path: '/',
    name: 'Home',
    element: <Home />
  },
  {
    path: 'new-password',
    name: 'NewPassword',
    element: <NewPassword />
  }
]