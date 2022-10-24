import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import image from "../assets/images";

import { setAuth_slice } from "../redux/authSlice";
import { setToastify_slice } from "../redux/toastifySlice";

import { login } from "../services/authService";

const userInfo = {
  username: "",
  password: "",
};

const Login = () => {
  const [userData, setUserData] = useState(userInfo);

  const { username, password } = userData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { access_token, error } = await login(userData);

    if (error) {
      return dispatch(setToastify_slice({ type: "error", text: error[0].msg }));
    }

    localStorage.setItem("access_token", access_token);

    dispatch(setAuth_slice(true));

    navigate("/");
  };

  const { loading } = useSelector((state) => state.auth);

  if (loading) return null;

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-col h-full g-6 space-y-16">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src={image.logo}
              className="aspect-video m-auto"
              alt="Cygames magazine"
            />
          </div>
          <div className="xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChangeInput}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Username"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
