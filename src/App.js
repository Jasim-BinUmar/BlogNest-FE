import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './(auth)/signUp';
import SignIn from './(auth)/signIn';
import HomePage from './(pages)/HomePage';
import BlogsPage from './(pages)/blogsPage';
import MyBlogs from './(pages)/myBlogs';
import LandingPage from './(pages)/landingPage';
import BlogView from './(pages)/blogView';
import EditBlog from './(pages)/editBlog';
import CreateBlog from './(pages)/createBlog';
import ProtectedRoute from './util/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/homepage" element={<ProtectedRoute element={HomePage} />} />
        <Route path="/blogs" element={<ProtectedRoute element={BlogsPage} />} />
        <Route path="/myblogs" element={<ProtectedRoute element={MyBlogs} />} />
        <Route path="/blogs/:id" element={<ProtectedRoute element={BlogView} />} />
        <Route path="/editblog/:id" element={<ProtectedRoute element={EditBlog} />} />
        <Route path="/createBlog" element={<ProtectedRoute element={CreateBlog} />} />
      </Routes>
    </Router>
  );
}

export default App;
