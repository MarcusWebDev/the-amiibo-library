import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AmiiboLibrary from "./components/AmiiboLibrary";
import AmiiboDetailsDataWrapper from "./components/AmiiboDetailsDataWrapper";
import TermsOfServiceAndPrivacy from "./components/TermsOfServiceAndPrivacy";
import HomePage from "./components/HomePage";
import RequireAuthentication from "./components/RequireAuthentication";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/amiibo",
        element: (
          <AmiiboLibrary
            header="Amiibo"
            showAddRemove={false}
            showOwnedUnowned={false}
            isCollection={false}
          />
        ),
      },
      {
        path: "/amiibo/:amiiboId",
        element: <AmiiboDetailsDataWrapper />,
      },
      {
        path: "/myCollection",
        element: (
          <RequireAuthentication
            component={
              <AmiiboLibrary
                className="collection-library"
                header="My Collection"
                showAddRemove={true}
                showOwnedUnowned={true}
                isCollection={true}
              />
            }
          />
        ),
      },
      {
        path: "/termsOfServiceAndPrivacy",
        element: <TermsOfServiceAndPrivacy />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
