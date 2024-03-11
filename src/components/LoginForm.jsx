import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCredentials } from "../features/auth/authSlice";
import { Button } from "./ui/button";

export const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/v1/users/login", null, {
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
        },
      })
      .then((response) => {
        const token = response.data.data.token;
        dispatch(setCredentials({ user: username, token }));
        navigate("/overview", { replace: true });
      })
      .catch((error) => {
        console.error("coś źle niestety:", error);
      });
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlepasswordInput = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center bg-mywhite">
        <div>
          <h1 className="text-center text-2xl font-bold text-myblack">
            username: user
          </h1>
          <h1 className="text-center text-2xl font-bold  text-myblack">
            password: 1234
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold t text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium  text-myblack"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  value={username}
                  onChange={handleUserInput}
                  autoComplete="off"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-myblack ring-1 ring-myblack"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-myblack"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-mybrown hover:text-mygray"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  onChange={handlepasswordInput}
                  value={password}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-myblack ring-1 ring-myblack"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-mybrown hover:text-mygray"
            >
              REGISTER
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default Login;
