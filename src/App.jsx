import { jwtDecode } from "jwt-decode";
import React from "react";
import { Outlet } from "react-router-dom";

import "./App.scss";

import Footer from "./components/Footer";
import MobileNavBar from "./components/MobileNavBar";
import NavBar from "./components/NavBar";

const isSearchStringMatch = (amiibo, searchString) =>
  amiibo.character.toLowerCase().includes(searchString.toLowerCase()) ||
  amiibo.amiiboSeries.toLowerCase().includes(searchString.toLowerCase());

function App() {
  const [amiiboList, setAmiiboList] = React.useState([]);
  const [filteredAmiiboList, setFilteredAmiiboList] = React.useState([]);
  const [amiiboBackgroundColors, setAmiiboBackgroundColors] = React.useState(
    new Map(),
  );
  const [searchString, setSearchString] = React.useState("");
  const [sortBy, setSortBy] = React.useState("characterName");
  const [isAscending, setIsAscending] = React.useState(true);
  const [isAddRemoveEnabled, setIsAddRemoveEnabled] = React.useState(false);
  const [selectedAmiiboIDs, setSelectedAmiiboIDs] = React.useState(new Set());
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [windowDimensions, setWindowDimensions] = React.useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });
  const [isGoogleSignInInitialized, setIsGoogleSignInInitialized] =
    React.useState(false);
  const [user, setUser] = React.useState(null);
  const [shouldShowOwned, setShouldShowOwned] = React.useState(true);
  const [shouldShowUnowned, setShouldShowUnowned] = React.useState(true);

  const amiiboComparator = React.useCallback(
    (a, b) => {
      if (sortBy === "releaseDate") {
        if (isAscending) {
          return new Date(a.release.na) - new Date(b.release.na);
        } else {
          return new Date(b.release.na) - new Date(a.release.na);
        }
      } else if (sortBy === "characterName") {
        if (isAscending) {
          return a.character.localeCompare(b.character);
        } else {
          return b.character.localeCompare(a.character);
        }
      } else if (sortBy === "amiiboSeries") {
        if (isAscending) {
          return a.amiiboSeries.localeCompare(b.amiiboSeries);
        } else {
          return b.amiiboSeries.localeCompare(a.amiiboSeries);
        }
      } else {
        console.error(`Error: invalid sortBy: '${sortBy}'.`);
      }
    },
    [sortBy, isAscending],
  );

  // Filter the amiibos based on various criteria.
  React.useEffect(() => {
    if (shouldShowOwned && shouldShowUnowned) {
      setFilteredAmiiboList(
        amiiboList
          .filter((amiibo) => isSearchStringMatch(amiibo, searchString))
          .sort(amiiboComparator),
      );
    } else if (shouldShowOwned && !shouldShowUnowned) {
      setFilteredAmiiboList(
        amiiboList
          .filter(
            (amiibo) =>
              amiibo.collected && isSearchStringMatch(amiibo, searchString),
          )
          .sort(amiiboComparator),
      );
    } else if (!shouldShowOwned && shouldShowUnowned) {
      setFilteredAmiiboList(
        amiiboList
          .filter(
            (amiibo) =>
              !amiibo.collected && isSearchStringMatch(amiibo, searchString),
          )
          .sort(amiiboComparator),
      );
    } else {
      setFilteredAmiiboList([]);
    }
  }, [
    amiiboList,
    amiiboComparator,
    searchString,
    shouldShowOwned,
    shouldShowUnowned,
  ]);

  const toggleSelectedAmiiboCollection = React.useCallback(
    async (selectedIDs) => {
      const amiibosToToggle = [];

      // Toggle the amiibos on the client side
      const newAmiiboList = amiiboList.map((amiibo) => {
        if (selectedIDs.has("" + amiibo.head + amiibo.tail)) {
          const newAmiibo = { ...amiibo, collected: !amiibo.collected };

          amiibosToToggle.push(newAmiibo);

          return newAmiibo;
        } else {
          return amiibo;
        }
      });

      let requestComplete = false;

      // Toggle the amiibos in the database
      await fetch("https://api.amiibolibrary.com/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,
          amiibos: amiibosToToggle,
        }),
      })
        .then(() => (requestComplete = true))
        .catch((e) => console.error(e));

      setSelectedAmiiboIDs(new Set());

      if (requestComplete) {
        return newAmiiboList;
      } else {
        return amiiboList;
      }
    },
    [amiiboList, user],
  );

  const setAmiiboBackgroundColor = React.useCallback((amiibo, color) => {
    setAmiiboBackgroundColors((prevAmiiboBackgroundColors) => {
      const newMap = new Map(prevAmiiboBackgroundColors);

      newMap.set("" + amiibo.head + amiibo.tail, color);

      return newMap;
    });
  }, []);

  const handleGoogleResponse = React.useCallback((response) => {
    const userObject = jwtDecode(response.credential);

    setUser(userObject);

    // Create the user in the database if they don't already exist.
    fetch("https://api.amiibolibrary.com/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userObject,
      }),
    })
      // Retrieve user's collected amiibos and update the client side amiibo list.
      .then(() => {
        return fetch(
          `https://api.amiibolibrary.com/amiibo/${userObject.email}`,
          {
            method: "GET",
          },
        );
      })
      .then(async (response) => ({
        status: response.status,
        collectedAmiiboIds: await response.json(),
      }))
      .then(({ status, collectedAmiiboIds }) => {
        setAmiiboList((prevAmiiboList) => {
          const newAmiiboList = [...prevAmiiboList].map((amiibo) => ({
            ...amiibo,
            collected:
              status === 200 &&
              collectedAmiiboIds.includes("" + amiibo.head + amiibo.tail),
          }));

          return newAmiiboList;
        });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSignOut = React.useCallback(() => {
    setUser(null);
  }, []);

  // Retrieve all amiibos from the third party amiibo API.
  React.useEffect(() => {
    fetch("https://amiiboapi.com/api/amiibo/?showusage")
      .then((response) => response.json())
      .then((json) => {
        const figures = json.amiibo.filter(
          (amiibo) => amiibo.type === "Figure",
        );

        setAmiiboList(figures);
      })
      .catch((e) => console.error(e));
  }, []);

  React.useEffect(() => {
    const script = document.createElement("script");

    script.setAttribute("src", "https://accounts.google.com/gsi/client");
    script.setAttribute("id", "googleScript");
    script.setAttribute("async", "true");
    script.setAttribute("defer", "true");
    script.addEventListener("load", () => {
      // Initialize must only be called once. https://developers.google.com/identity/gsi/web/reference/js-reference
      window.google.accounts.id.initialize({
        client_id:
          "551904080519-u8me401rq4adum4bvqnafig5dn2e2095.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      setIsGoogleSignInInitialized(true);
    });

    document.head.appendChild(script);
  }, [handleGoogleResponse]);

  React.useEffect(() => {
    if (windowDimensions.innerWidth < 1024) {
      setIsDesktop(false);
    } else {
      setIsDesktop(true);
    }
  }, [windowDimensions]);

  React.useEffect(() => {
    if (isGoogleSignInInitialized && user === null) {
      if (isDesktop) {
        window.google.accounts.id.renderButton(
          document.getElementById("sign-in"),
          { theme: "outline", size: "medium" },
        );
      } else {
        window.google.accounts.id.renderButton(
          document.getElementById("sign-in"),
          { theme: "outline", size: "medium", type: "icon" },
        );
      }
    }
  }, [isDesktop, isGoogleSignInInitialized, user]);

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      setWindowDimensions({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      }),
    );

    return window.removeEventListener("resize", () =>
      setWindowDimensions({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      }),
    );
  }, []);

  return (
    <div className="App">
      <NavBar isDesktop={isDesktop} user={user} handleSignOut={handleSignOut} />
      {!isDesktop && (
        <MobileNavBar
          searchString={searchString}
          setSearchString={setSearchString}
          setIsAscending={setIsAscending}
          setSortBy={setSortBy}
          isSignedIn={user !== null}
          toggleSelectedAmiiboCollection={toggleSelectedAmiiboCollection}
          isAddRemoveEnabled={isAddRemoveEnabled}
          setIsAddRemoveEnabled={setIsAddRemoveEnabled}
          setAmiiboList={setAmiiboList}
          selectedAmiiboIDs={selectedAmiiboIDs}
          shouldShowOwned={shouldShowOwned}
          shouldShowUnowned={shouldShowUnowned}
          setShouldShowOwned={setShouldShowOwned}
          setShouldShowUnowned={setShouldShowUnowned}
        />
      )}
      <main>
        <Outlet
          context={{
            user,
            amiiboList,
            setAmiiboList,
            filteredAmiiboList,
            amiiboBackgroundColors,
            setAmiiboBackgroundColor,
            isDesktop,
            searchString,
            setSearchString,
            setSortBy,
            setIsAscending,
            isAddRemoveEnabled,
            setIsAddRemoveEnabled,
            toggleSelectedAmiiboCollection,
            selectedAmiiboIDs,
            setSelectedAmiiboIDs,
            shouldShowOwned,
            setShouldShowOwned,
            shouldShowUnowned,
            setShouldShowUnowned,
            windowDimensions,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
