import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import Dashboard from './pages/Dashboard';

import { SignIn } from './pages/SignIn';
import { Register } from './pages/Register';
import { Projects } from './pages/Projects';
import { Header } from './components/Header';
import { useSelector } from 'react-redux';
import { PrivateRoute } from './components/PrtivateRoute';
import { Post } from './pages/Post';
import BlogShow from './pages/BlogShow';
import ViewProfile from './pages/ViewProfile';
import { Profile } from './components/dashboard/Profile';
import UserPost from './components/dashboard/UserPost';
// import CreateForm from './components/Post/CreateForm';


const App = () => {
  let isDarkMode = useSelector((state) => state?.theme?.isDarkMode)
  // console.log(isDarkMode);

  return (
    <div className={`${isDarkMode ? "bg-[#262525] text-gray-100 border-gray-500 " : "min-h-screen bg-gray-200  text-gray-800 border-gray-800"} overflow-x-hidden relative 
     pt-16`} >
      <BrowserRouter >
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/view-profile/:id' element={<ViewProfile />} />
          <Route path='/blog/:id' element={<BlogShow />} />

          {/* private route define   */}
          <Route element={<PrivateRoute />}>
          <Route path='/post/:operation' element={<Post/>} />
            <Route path="/dashboard" element={<Dashboard />}>
              {/* Nested route for post operations */}
              <Route index element={<Navigate to={"/dashboard/profile"} />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/user-all-post" element={<UserPost />} />
            </Route>
          </Route>



        </Routes>

      </BrowserRouter>
    </div>
  )
}


export default App;
