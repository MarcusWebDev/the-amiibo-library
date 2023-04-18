import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AmiiboLibrary from "./Components/AmiiboLibrary/AmiiboLibrary";
import AmiiboDetailsDataWrapper from './Components/AmiiboDetailsDataWrapper/AmiiboDetailsDataWrapper';
import TermsOfServiceAndPrivacy from './Components/TermsOfServiceAndPrivacy/TermsOfServiceAndPrivacy';
import HomePage from './Components/HomePage/HomePage';
import RequireAuthentication from './Components/RequireAuthentication/RequireAuthentication';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/amiibo",
        element: <AmiiboLibrary header={"Amiibo"} showAddRemove={false} showOwnedUnowned={false} isCollection={false}/>
      },
      {
        path: "/amiibo/:characterName/:amiiboId/:colorArray",
        element: <AmiiboDetailsDataWrapper />
      },
      {
        path: "/mycollection",
        element: <RequireAuthentication component={<AmiiboLibrary header={"My Collection"} showAddRemove={true} showOwnedUnowned={true} isCollection={true} />}/>
      },
      {
        path: "/termsOfServiceAndPrivacy",
        element: <TermsOfServiceAndPrivacy />
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
