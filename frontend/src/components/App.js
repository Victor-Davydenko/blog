import {router} from "../router/router";
import {RouterProvider} from "react-router-dom";
import {useContext, useEffect} from "react";
import Context from "../index";
import {observer} from "mobx-react-lite";

function App() {
  const { userStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      userStore.checkAuth();
    }
  }, []);
  return (
    <RouterProvider router={router} />
  );
}

export default observer(App);
