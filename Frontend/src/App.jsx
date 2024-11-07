import React, { useEffect } from 'react'
import Login from './components/login/Login.jsx'
import Signup from './components/signup/Signup.jsx'
import Logout from './components/logout/Logout.jsx'
import BlogPosts from './components/blogs/BlogPosts.jsx'
// import Posts from './components/blogs/Posts.jsx'
import WellcomePage from './components/wellcomePage/WellcomePage.jsx'
import DisplaySinglePost from './components/blogs/DisplaySinglePost.jsx'
import UploadBlogPost from './components/blogs/UploadBlogPost.jsx'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from './context/AunthUsers.jsx'
import Home from './components/home/Home.jsx'
import Header from './components/home/Header.jsx'
import { usePostStore } from './statemanagement/GetAllPosts.jsx'
import ChangePassword from './components/update/ChangePassword.jsx'
import EditPost from './components/update/EditPost.jsx'
import CardPost from './components/blogs/CardPost.jsx'
import UserInfo from './components/userInfo/UserInfo.jsx'
import ChangeEmail from './components/update/ChangeEmail.jsx'
import ChangeUserName from './components/update/ChangeUserName.jsx'
import CheckUsersLogin from './context/CheckUsersLogin.jsx'

function App() {
  const { authUser, setAuthUsers } = useAuth();
  const location = useLocation();

  CheckUsersLogin();

  // console.log("authUsers in app: ", authUser);
  return (
    <>
      {location.pathname !== "/" && <Header />}
      <Routes>
        <Route path='/' element={!authUser ? <WellcomePage /> : <Navigate to={"/home"} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/uploadPost' element={authUser ? <UploadBlogPost /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/home"} />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={"/home"} />} />
        <Route path='/logout' element={authUser ? <Logout /> : <Navigate to={"/home"} />} />
        <Route path='/singlePost' element={authUser ? <DisplaySinglePost /> : <Navigate to={"/home"} />} />
        <Route path='/cardPost' element={authUser ? <CardPost /> : <Navigate to={"/home"} />} />
        <Route path='/changePassword' element={authUser ? <ChangePassword /> : <Navigate to={"/home"} />} />
        <Route path='/changeEmail' element={authUser ? <ChangeEmail /> : <Navigate to={"/home"} />} />
        <Route path='/changeUserName' element={authUser ? <ChangeUserName /> : <Navigate to={"/home"} />} />
        <Route
          path="/editPost/:postId"
          element={authUser ? <EditPost /> : <Navigate to="/home" />}
        />
        <Route path='userInfo' element={authUser ? <UserInfo /> : <Navigate to={"/home"} />} />
      </Routes>

    </>
  )
}

export default App