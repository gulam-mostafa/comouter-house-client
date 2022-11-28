import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Input } from "postcss";
import React, { Profiler, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Context/AuthProvider";
import { FaBeer, FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import { async } from "@firebase/util";
import useToken from "../Components/Hooks/useToken";
import { useTitle } from "../Components/Hooks/useTitle";
const imageHostKey = process.env.REACT_APP_imgbb_key



const SignUp = () => {
  useTitle('signup')
  const { logout, updateUserProfile, providerLogin, createUser } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUserEmail, setLoginUserEmail] = useState('')

  const [createUserEmail, setCreateUserEmail] = useState('')

console.log(createUserEmail)
  // jwt use hook token
  const [token] = useToken(createUserEmail);

  const from = location.state?.from?.pathname || "/";
  const googleProvider = new GoogleAuthProvider()

  const [termsAccepted, setTermsAccepted] = useState(false);



  // cffffffffffff
  const termsAndCondition = (event) => {
    setTermsAccepted(event.target.checked);

  };
  if (token) {
    navigate('/')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password2 = form.password2.value;
    const password = form.password.value;
    const account = event.target.selectOption.value;
    const image = form.photo.files[0];
    if (password !== password2) {
      setError('password Password not matched')
      return
    }
    setLoading(true)
    setError('')

    console.log(name, image, email, password, password2, account);

    const formData = new FormData()
    formData.append('image', image)

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        createUser(email, password)
          .then((result) => {
            const currentUser = { displayName: name, photoURL: data?.data?.display_url }
            updateUserProfile(currentUser)
            
            const users =  { name, email, password, account, createdAt: new Date().toISOString(), photoURL: data?.data?.display_url };

            fetch('https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/users', {
              method: 'POST',
              headers: {
                "content-type": "application/json"
              },
              body: JSON.stringify(users)
            })
              .then(res => res.json())
              .then(data =>  {
                
                console.log(email)
                setCreateUserEmail(email)
               
               
              })
              .then(() => {
                // navigate('/home')
              })
              .catch(err => console.log(err))
            const user = result.user;
            console.log(user)
            setLoading(false)
            setError("");
            if (user.email) {
              console.log(user.email)
             
              toast("Registration successful", {
                position: toast.POSITION.TOP_CENTER
                
              })
              // navigate(from, { replace: true });
              setLoading(false)
            }

          })
          .catch((e) => {
            console.log(e);
            setError(e.message);
            setLoading(false)
            // setLoading(false)
          });
      })
      .catch(err => console.log(err))

  };




   const handleGoogleLogin = () => {
    providerLogin(googleProvider)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
        }
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(user.displayName, user.email, 'buyer')
          })
          .catch(error => console.error(error))
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  const saveUser = (displayName, email, account) => {
    const user = { displayName, email, account }
    fetch('https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/users', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        setCreateUserEmail(user.email)
        console.log(user.email)
        toast("sign up  successful", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
  }






  return (
    <div className="md:mx-6">
      <div className="w-full justify-around my-8 lg:flex">
        <div className="w-full text-center text-xl font-bold ">
          <h2 className="text-xl text-black my-auto">Welcome To Our Page</h2>
          <img
            src="https://i.ibb.co/C5624CF/118046-lf20-oahmox5rjson.gif"
            alt=""
          />
        </div>
        <div className=" bg-red-5 md:px-10 px-4 py-4 my-8 lg:w-4/5">
          <h1 className="text-black text-5xl font-bold mb-5 text-center ">Sign Up</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* name  */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your Name" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Type Your Name"
                required
                shadow
              />
            </div>
            {/* email  */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="Your email" />
              </div>
              <TextInput
                id="email2"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                shadow
              />
            </div>
            {/* photo */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-red-900 dark:text-white"
                htmlFor="photo"
              >
                Upload Your photo
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-green-500 rounded-lg cursor-pointer bg-gray-230 dark:text-gray-400 focus:outline-none dark:bg-red-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="photo"
                type="file"
                name="photo"
              ></input>
            </div>
            <div>
              <p className="mb-2 block">Account Types</p>
              <select name='selectOption' required className="select select-info w-full max-w-xs">
                <option name='buyer' value={'buyer'}>Buyer</option>
                <option name='seller' value={'seller'}>Seller</option>

              </select>
            </div>

            {/* password 1  */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                required
                shadow
              />
            </div>
            {/* repeate password  */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Repeat password" />
              </div>
              <TextInput
                id="password2"
                type="password"
                required
                shadow
                name="password2"
              />
            </div>

            {/* Error show  */}
            <p className="text-red-500">{error.slice(9)}</p>
            {/* check box / mark  */}
            <div className="flex items-center gap-2">
              <Checkbox
                onClick={termsAndCondition}
                id="agree"
                type="checkbox"
              />
              <Label htmlFor="agree">
                I agree with the{" "}
                <Link
                  to="/terms"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </Link>
              </Label>{" "}
            </div>
            <p className="flex items-center gap-2">
              Already SIgn Up{" "}
              <Link className="text-blue-500 underline" to="/login">
                Login
              </Link>
            </p>
            {
              loading ?
                (
                  <div className="text-center m-auto "> <Loading></Loading></div>
                )
                :
                (
                  <Button className="lg:w-1/2 lg:mx-auto" disabled={!termsAccepted} type="submit">
                    Sign Up
                  </Button>
                )
            }
            <div className="flex justify-between  py-8">
              <div className="flex w-full">
                <div className="flex flex-col w-full border-opacity-50">
                  <div className=""></div>
                  <div className="divider text-xl font-bold text-black">
                    Or continue with
                  </div>
                  <div className="grid h-20 card  rounded-box place-items-center">
                    <div>
                      <Button
                        disabled={!termsAccepted}
                        gradientDuoTone="purpleToBlue"
                        className="btn btn-white text-3xl"
                        onClick={handleGoogleLogin}
                      >
                        <FcGoogle className="mr-4 text-xl " /> Google
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
