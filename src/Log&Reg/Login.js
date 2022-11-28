import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth, AuthContext } from "../Components/Context/AuthProvider";
import { FaBeer, FcGoogle } from "react-icons/fc";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import app from "../firebase/firebase.config";
import useToken from "../Components/Hooks/useToken";
import { useTitle } from "../Components/Hooks/useTitle";

const Login = () => {
  useTitle('login')
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginUserEmail, setLoginUserEmail] = useState('')
  const [token] = useToken(loginUserEmail)
  const [userEmail, setUserEmail] = useState("");
  console.log(error);
  const { user, logout, signIn, redirect, providerLogin, forgotPassword, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const googleProvider = new GoogleAuthProvider();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setLoading(true);
    setError('');
    signIn(email, password)
      .then((result) => {
        const user = result.user;



        const currentUser = {
          email: user.email,
        };
        if (user.uid) {
          setLoginUserEmail(user.email)

          toast("Login successful", {
            position: toast.POSITION.TOP_CENTER,
          });

          setLoading(false);
        }
        console.log(currentUser);
        setError("");
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
        setLoading(false);
      });
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
        setLoginUserEmail(user.email)
        toast("Login successful", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
  }

  const handleFacebookLogin = () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result);
        const credential = facebookProvider.credential.credential();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        setError(error.message);
      });
  };

  const handleEmailBlur = (event) => {
    const form = event.target;
    const email = form.value;
    setUserEmail(email);
    console.log(email);
  };
  const handleForgotPassword = (event) => {
    event.preventDefault();

    console.log(userEmail);

    forgotPassword(userEmail)
      .then(() => {
        setError('')
        toast("reset mail sent. Check Your mail box", {
          position: toast.POSITION.TOP_CENTER,

        }

        );

      })
      .catch((error) => {
        setError(error.message);
      });
    ;
  };

  return (
    <div className="w-full justify-around lg:flex my-auto">
      <div className=" text-xl text-center font-bold m-auto ">
        <h2>Welcome To Login Page</h2>
        <img className="w-full " src="https://i.ibb.co/njKWbpV/hello-login.gif" alt="" />
      </div>

      <div className=" bg-red-5 md:px-10 px-4 py-4 my-8 lg:w-1/2">
        <h1 className="text-black text-5xl text-center font-bold mb-5 ">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2" value="Your email" />
            </div>
            <TextInput
              id="email2"
              type="email"
              placeholder="Type Your email"
              required
              shadow
              name="email"
              onBlur={handleEmailBlur}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Your password" />
            </div>
            <TextInput
              id="password2"
              type="password"
              name="password"
              required
              shadow={true}
              placeholder={'Type Your passWord'}
            />
          </div>
          {/* Error show  */}
          <p className="text-red-500">{error.slice(9)}</p>

          {loading ? (
            <Loading></Loading>
          ) : (
            <Button className="lg:w-1/2 lg:mx-auto text-center " type="submit">
              Log in
            </Button>
          )}
        </form>
        <p className="my-4">
          Forgot Password{" "}
          <button
            onClick={handleForgotPassword}
            className=" underline text-blue-600"
          >
            reset
          </button>
        </p>
        <p>
          Don't have an account?{" "}
          <Link className="text-blue-500 underline" to="/signup">
            Register
          </Link>
        </p>
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
                    onClick={handleGoogleLogin}
                    gradientDuoTone="purpleToBlue"
                    className="btn btn-white text-3xl"
                  >
                    <FcGoogle className="mr-4 text-xl " /> Google
                  </Button>
                  {/* <Button
                    onClick={handleFacebookLogin}
                    gradientDuoTone="purpleToBlue"
                    className="btn btn-white text-3xl"
                  >
                    <FcGoogle className="mr-4 text-xl " /> Facebook
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
