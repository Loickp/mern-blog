import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { loadUser } from "./state/actions/authActions";
import Navbar from './components/Navbar';
import AddPost from './components/AddPost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Routing
import AuthRoutes from './routes/AuthRoutes';

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route element={<AuthRoutes />}>
              <Route path="/post/edit/:id" element={<EditPost />} />
              <Route path="/add" element={<AddPost />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
