import Home from "../pages/Home";
import NewPassword from "../pages/NewPassword";
import Auth from "../pages/Auth";

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
  },
  {
    path: 'auth',
    name: 'auth',
    element: <Auth />
  }
]