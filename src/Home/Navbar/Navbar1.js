import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Components/Context/AuthProvider";
import './Navbar.css'


const Navbar1 = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => { })
      .catch((error) => console.log(error));
    if (user) {
      toast("logout success", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  let activeStyle = {

    backgroundColor: '#4718B3',
    fontSize: '20px',
    color: "#FFFA5C",
    textAlign: "center",

    borderRadius: '5px',
    padding: '2px 4px'

  };



  return (
    <div className="bg-stone- bgColor md:px-16 py-6" >
      <Navbar fluid rounded className="  bg-stone- bgColor textColor">
        <Navbar.Brand href="/" className="md:px- lg:px-">

          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white mr-6 h-6 sm:h-9">
            Computer House
          </span>
          <img
            src="https://i.ibb.co/Wc4J828/pc-logo.png"
            className="mr-6 h-14  hidden md:block "
            alt="Logo"
          />


        </Navbar.Brand>
        <div className="flex md:order-2">
          {user?.uid ? (
            <>
              <Dropdown
                arrowIcon={false}
                inline={true}
                label={
                  <Avatar
                    alt="User settings"
                    img={user?.photoURL}
                    rounded={true}
                  />
                }
              >
                {user?.photoURL ? (
                  <img
                    className=" rounded-full mx-auto  h-20 w-20 "
                    src={user?.photoURL}
                    alt=""
                  />
                ) : (
                  <Avatar
                    alt="User settings"
                    img="https://i.ibb.co/YWyS5Mj/avatar.png"
                    rounded
                    className="w-10 h-10 rounded-full"
                  />
                )}

                <Dropdown.Header >
                  <span className="block text-sm">{user?.displayName}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </Dropdown.Header >
                <Dropdown.Item><Link to='/dashboard'>Dashboard</Link></Dropdown.Item>
                <Dropdown.Item><Link to='/myorder'>My Order</Link></Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <>
              <NavLink className="text-bold textColor md:text-xl mx-2" to="/login"
                style={({ isActive }) => isActive ? activeStyle : undefined}
              >
                login
              </NavLink>
              <NavLink className="text-bold textColor md:text-xl" to="/signup"
                style={({ isActive }) => isActive ? activeStyle : undefined}
              >
                Sign up
              </NavLink>
            </>
          )}

          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <NavLink to="/"
            className="text-bold textColor text-xl"
            style={({ isActive }) => isActive ? activeStyle : undefined}
            active={"true"}>
            Home
          </NavLink>



          <NavLink className="text-bold textColor text-xl" to='/dashboard'
            style={({ isActive }) => isActive ? activeStyle : undefined}
          >
            Dashboard
          </NavLink>
          <NavLink
            style={({ isActive }) => isActive ? activeStyle : undefined}
            className="text-bold textColor text-xl" to="/terms">
            About
          </NavLink>
          <NavLink
            style={({ isActive }) => isActive ? activeStyle : undefined}
            className="text-bold textColor text-xl" to="/blog">
            blog
          </NavLink>


        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbar1;
