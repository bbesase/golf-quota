import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirebaseConfig } from './firebase.config.js';
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import SignIn from './pages/Auth/Sign-in';
import Homepage from './pages/Homepage/Home';
import { ChakraProvider } from '@chakra-ui/react'
import Dashboard from './pages/GolferDashboard/Dashboard';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/home',
    element: <Homepage />
  },
  {
    path: '/golfer/:id',
    element: <Dashboard />
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <App />
      <RouterProvider router={router} />
    </BrowserRouter> */}
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
