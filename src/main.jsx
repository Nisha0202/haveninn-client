import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from '../src/root';
import Home from './pages/Home';
import ErrorPage from './components/ErrorPage';
import CardDetails from './components/CardDetails';
import Login from './pages/Login'
import SignUp from './pages/Signup';
import Contact from './pages/Contact'
import About from './pages/About';
import FirbaseProvider from './FirebaseProbider/FirbaseProvider';
import UpdateData from './pages/UpdateData';
import UserProfile from './pages/UserProfile'
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';

import Modal from 'react-modal';
import PrivateRoute from './PrivateRoute';

Modal.setAppElement('#root');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/property_details/:id",
        element: <CardDetails />,
        loader: () => fetch(`http://localhost:5000/rooms`)
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/rooms",
        element: <Rooms/>,
      },
      {
        path: "/mybookings",
        element: <PrivateRoute><Bookings/></PrivateRoute>,
      },
      {
        path: "/contact",
        element:<PrivateRoute><Contact/></PrivateRoute> ,
      },
      {
        path: "/about",
        element: <About /> ,
      },
      {
        path: "/update",
        element: <PrivateRoute> <UpdateData/></PrivateRoute>,
      },
      {
        path: "/user",
        element: <PrivateRoute><UserProfile/></PrivateRoute>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirbaseProvider>
      <RouterProvider router={router} />
    </FirbaseProvider>
  </React.StrictMode>,
)
