import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Vuln from './Pages/Vuln';
import ScanResult from './Pages/ScanResult';
import Contact from './Pages/Contact';
import Manual from './Pages/Manual';
import Scan from './Pages/Scan';
import AuthProvider from './context/context';
import PrivateRoute from './utils/PrivateRoute';
import { Login } from './Pages/Login';
import { Signup } from './Pages/signup';
import Logout from './Pages/Signout';
import GlobalContextProvider from './context/globalContext';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>,
  },
  {
    path:'/scan',
    element:<PrivateRoute><Scan/></PrivateRoute>,
  },
  // {
  //   path:'/vuln',
  //   element:<PrivateRoute><Vuln/></PrivateRoute>,
  // },
  {
    path:'/scan/:id',
    element:<PrivateRoute><ScanResult/></PrivateRoute>,
  },
  {
    path:'/scan/:scan_id/:host_id',
    element:<PrivateRoute><Vuln/></PrivateRoute>,
  },
  {
    path:'/contact',
    element:<Contact/>,
  },
  {
    path:'/manual',
    element:<Manual/>,
  },
  // {
  //   path:'/loginSignup',
  //   element:<LoginSignup/>,
  // },
  {
    path:'/login',
    element:<Login/>,
  },
  {
    path:'/signup',
    element:<Signup/>,
  },
{
  path:'/logout',
  element:<PrivateRoute><Logout/></PrivateRoute>,
},  
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <GlobalContextProvider>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </GlobalContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
