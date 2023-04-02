import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AmiiboLibrary from "./Components/AmiiboLibrary/AmiiboLibrary";
import AmiiboDetails from "./Components/AmiiboDetails/AmiiboDetails";
import AmiiboDetailsDataWrapper from './Components/AmiiboDetailsDataWrapper/AmiiboDetailsDataWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/amiibo",
        element: <AmiiboLibrary />
      },
      {
        path: "/amiibo/:characterName/:amiiboId/:colorArray",
        element: <AmiiboDetailsDataWrapper />
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
