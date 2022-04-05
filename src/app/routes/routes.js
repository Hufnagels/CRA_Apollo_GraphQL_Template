import React from "react";
import { Navigate, Outlet, Link, useParams } from "react-router-dom";

// Pages imports
import AdminLayout from "../../pages/backend/Layout/AdminLayout"
import MapsListIndex from "../../components/Maps/MapsListIndex";
import PostsListIndex from "../../components/Posts/PostsListIndex";
// //import MindMapList from "../../components/MindMap/_temp/MindMapList";
// import MindMapListItem from "../../components/MindMap/wrappers/MindMapListItem";
// import Profile from '../pages/backend/User/Profile'


import MainLayout from "../../pages/frontend/Layout/MainLayout";
import SignInSide from "../../pages/frontend/SigIn";
import SignUp from "../../pages/frontend/SignUp";
import Home from "../../pages/frontend/Home";
import Blog from "../../pages/frontend/Blog"
// 
// import BlogListItem from "../../components/Blog/wrappers/BlogListItem"
import UsersListIndex from '../../components/Users/UsersListIndex'

const routes = (isLoggedIn) => [
  {
    path: "/app",
    element: isLoggedIn ? <AdminLayout /> : <Navigate to="/signin" />,
    children: [
      { index: true, element: <Dashboard /> },
      //{ path: '/', element: <Navigate to="/app/dashboard" /> },
      {
        path: '/app/users',
        element: <Outlet />,
        children: [
          { index: true, element: <UsersListIndex /> },
          //{ path: '/app/user/profile', element: <Profile /> },
        ],
      },
      {
        path: '/app/maps',
        element: <Outlet />,
        children: [
          { index: true, element: <MapsListIndex /> },
          //{ path: '/app/user/profile', element: <Profile /> },
        ],
      },
      {
        path: "/app/courses",
        element: <Courses />,
        children: [
          { index: true, element: <CoursesIndex /> },
          { path: "/app/courses/:id", element: <Course /> },
        ],
      },
      {
        path: "/app/blogs",
        element: <Outlet />,
        children: [
          { index: true, element: <PostsListIndex /> },
          //{ path: "/app/blogs/:id", element: <Course /> },
        ],
      },
      { path: "*", element: <NoMatch /> },
      // https://stackoverflow.com/questions/62384395/protected-route-with-react-router-v6
      // {
      //   path: 'member',
      //   element: <Outlet />,
      //   children: [
      //     { path: '/', element: <MemberGrid /> },
      //     { path: '/add', element: <AddMember /> },
      //   ],
      // },
    ],
  },
  {
    path: '/',
    element: <MainLayout />, //!isLoggedIn ? <MainLayout /> :null,
    children: [
      { path: 'signin', element: <SignInSide /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'blog', element: <Outlet />,
        children: [
          { index: true, element: <BlogListIndex /> },
          { path: "/blog/:id", element: <BlogListItem /> },
        ], 
      },
      { path: '/', element: <Home /> }, //<Navigate to="/login" /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
];

export default routes

function Dashboard(){
  return (
    <div>Dashboard</div>
  )
}
function BlogListIndex() {
  return (
    <div>BlogListIndex</div>
  )
}
function BlogListItem() {
  return (
    <div>BlogListItem</div>
  )
}

function Courses() {
  return (
    <div>
      <h2>Courses</h2>
      <Outlet />
    </div>
  );
}

function CoursesIndex() {
  return (
    <div>
      <p>Please choose a course:</p>

      <nav>
        <ul>
          <li>
            <Link to="react-fundamentals">React Fundamentals</Link>
          </li>
          <li>
            <Link to="advanced-react">Advanced React</Link>
          </li>
          <li>
            <Link to="react-router">React Router</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Course() {
  let { id } = useParams('id');

  return (
    <div>
      <h2>
        Welcome to the {id.split("-").map(capitalizeString).join(" ")} course!
      </h2>

      <p>This is a great course. You're gonna love it!</p>

      <Link to="/app/courses">See all courses</Link>
    </div>
  );
}

function capitalizeString(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}