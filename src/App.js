import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./Router/Routes";
import { Footer } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="Ap  m-auto  bg-slate-00 ">
      <RouterProvider router={Routes}></RouterProvider>
      <ToastContainer />

    </div>
  );
}

export default App;
