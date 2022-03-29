import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const auth = useSelector((state) => state.authReducer)

  if(auth.user === null){
    return false
  }

  return true
}

const AuthRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/login" />
};

export default AuthRoutes;