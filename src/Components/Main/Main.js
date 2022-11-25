

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar1 from "../../Home/Navbar/Navbar1";
import PageFooter from "../Footer/PageFooter";




const Main = () => {

  return (
    <div>
      <div className=" min-h-screen">
        <Navbar1></Navbar1>
        <Outlet>
        </Outlet>
      </div>

      <div>

        <PageFooter></PageFooter>

      </div>
    </div>
  );
};

export default Main;
