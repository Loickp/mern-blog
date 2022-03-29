import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/actions/authActions"

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(auth.user != null){
      navigate("/")
    }
  }, [auth]);

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password))

    navigate('/')
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-6">Login</h1>
      <div className="flex justify-center mx-4 my-12">
        <div className="w-full max-w-xl">
          <form onSubmit={loginHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="********"
                required
                autoComplete="current-password" />
            </div>
            <div className="my-2">
              <a className="font-bold text-sm text-blue-500 hover:text-blue-800">
                Forgot password ?
              </a>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full" type="submit">
              Login
            </button>
            <p className="text-center my-2">Don't have account ? <Link to="/register"><span className="text-blue-500">Register now</span></Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default Login;