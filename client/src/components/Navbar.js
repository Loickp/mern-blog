import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../state/actions/authActions"

const Navbar = () => {
  const auth = useSelector((state) => state.authReducer)
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if(!dropRef.current.contains(e.target)){
        setDropOpen(false)
      }
    })
  }, [])
  
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/')
  }

	return(
		<div id="navbar" className="bg-gray-800">
      <nav className="flex items-center justify-between flex-wrap container mx-auto p-4 w-full text-white">
        <Link to="/">
          <h1 className="text-xl font-bold my-4">
            Modern Blog
          </h1>
        </Link>
        <div className="block md:hidden">
          <button onClick={() => setNavbarOpen(!navbarOpen)} className="flex items-center px-3 py-2 border rounded text-gray-100">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={"w-full flex-grow items-center text-center md:flex md:justify-end md:w-auto" + (navbarOpen ? "" : " hidden")}>
          {auth.user &&
            <div className="lg:mx-4">
              <Link to="/add">
                <button className="font-bold py-2 px-4 mx-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                  NEW POST
                </button>
              </Link>
            </div>
          }
          <div ref={dropRef} className="relative hidden md:block">
            <button onClick={() => setDropOpen(!dropOpen)}>
              <i className="fas fa-user"></i>
            </button>
            <div className={"absolute right-0 w-40 mt-4 py-2 text-left bg-white border rounded shadow-xl" + (dropOpen ? "" : " hidden")}>
              {auth.user ? (
                  <div>
                    <p className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-gray-100">{ auth.user.username }</p>
                    <p onClick={handleLogout} className="cursor-pointer transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-gray-100">Logout</p>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <p className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-gray-100">Login</p>
                    </Link>
                    <Link to="/register">
                      <p className="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-gray-100">Register</p>
                    </Link>
                  </div>
                )
              }
            </div>
          </div>
          {!auth.user &&
            <div className="md:hidden mx-4">
              <Link to="/login">
                <button className="font-bold py-2 px-4 mx-4 my-4 rounded-lg border hover:bg-blue-400 text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="font-bold py-2 px-4 mx-4 my-4 rounded-lg border hover:bg-blue-400 text-white">
                  Register
                </button>
              </Link>
            </div>
          }
        </div>
      </nav>
	  </div>
	);
}

export default Navbar