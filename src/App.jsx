import { Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import MobileNavBar from "./components/MobileNavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import "./App.scss";

function App() {
  const [amiiboList, setAmiiboList] = React.useState([]);
  const [filteredAmiiboList, setFilteredAmiiboList] = React.useState([]);
  const [amiiboBackgroundColors, setAmiiboBackgroundColors] = React.useState(
    new Map(),
  );
  const [sortBy, setSortBy] = React.useState("characterName");
  const [isAscending, setIsAscending] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");
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

  const filterAmiibos = (initialString) => {
    const searchString = initialString.toLowerCase();
    const isSearchStringMatch = (amiibo) =>
      amiibo.character.toLowerCase().includes(searchString) ||
      amiibo.amiiboSeries.toLowerCase().includes(searchString);
    setSearchText(searchString);

    if (shouldShowOwned && shouldShowUnowned) {
      setFilteredAmiiboList(
        amiiboList
          .filter((amiibo) => isSearchStringMatch(amiibo))
          .sort(amiiboComparator),
      );
    } else if (shouldShowOwned && !shouldShowUnowned) {
      setFilteredAmiiboList(
        amiiboList
          .filter((amiibo) => amiibo.collected && isSearchStringMatch(amiibo))
          .sort(amiiboComparator),
      );
    } else if (!shouldShowOwned && shouldShowUnowned) {
      setFilteredAmiiboList(
        amiiboList
          .filter((amiibo) => !amiibo.collected && isSearchStringMatch(amiibo))
          .sort(amiiboComparator),
      );
    } else {
      setFilteredAmiiboList([]);
    }
  };

  const toggleSelectedAmiiboCollection = async (selectedIDs) => {
    const databaseRequestArray = [];
    const newArray = amiiboList.map((amiibo) => {
      if (selectedIDs.has("" + amiibo.head + amiibo.tail)) {
        const newAmiibo = { ...amiibo, collected: !amiibo.collected };

        databaseRequestArray.push(newAmiibo);

        return newAmiibo;
      } else {
        return amiibo;
      }
    });

    let requestComplete = false;

    await fetch("https://api.amiibolibrary.com/collection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user,
        amiibos: databaseRequestArray,
      }),
    })
      .then((response) => response.json())
      .then(() => (requestComplete = true))
      .catch((e) => console.error(e));

    setSelectedAmiiboIDs(new Set());

    if (requestComplete) {
      return newArray;
    } else {
      return amiiboList;
    }
  };

  const amiiboComparator = (a, b) => {
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
  };

  const setAmiiboBackgroundColor = (amiibo, color) => {
    setAmiiboBackgroundColors((prevState) => {
      const newMap = new Map(prevState);

      newMap.set("" + amiibo.head + amiibo.tail, color);

      return newMap;
    });
  };

  const handleCallbackResponse = (response) => {
    const userObject = jwt_decode(response.credential);

    setUser(userObject);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  React.useEffect(() => {
    filterAmiibos(searchText);
  }, [amiiboList, shouldShowOwned, shouldShowUnowned, sortBy, isAscending]);

  React.useEffect(() => {
    if (user !== null) {
      fetch("https://api.amiibolibrary.com/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: user,
        }),
      })
        .then(() => {
          return fetch(`https://api.amiibolibrary.com/amiibo/${user.email}`, {
            method: "GET",
          });
        })
        .then(async (response) => ({
          status: response.status,
          json: await response.json(),
        }))
        .then(({ status, json }) => {
          const newArray = [...amiiboList];
          for (let i = 0; i < amiiboList.length; i++) {
            if (
              status === 200 &&
              json.includes("" + amiiboList[i].head + amiiboList[i].tail)
            ) {
              newArray[i].collected = true;
            } else {
              newArray[i].collected = false;
            }
          }

          const sortedNewArray = [...newArray].sort(amiiboComparator);

          setAmiiboList(newArray);
          setFilteredAmiiboList(sortedNewArray);
        })
        .catch((e) => console.error(e));
    }
  }, [user]);

  React.useEffect(() => {
    fetch("https://amiiboapi.com/api/amiibo/?showusage")
      .then((response) => response.json())
      .then((json) => {
        const figures = json.amiibo.filter(
          (amiibo) => amiibo.type === "Figure",
        );
        const sortedFigures = [...figures].sort(amiiboComparator);

        setAmiiboList(figures);
        setFilteredAmiiboList(sortedFigures);
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
      window.google.accounts.id.initialize({
        client_id:
          "551904080519-u8me401rq4adum4bvqnafig5dn2e2095.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      setIsGoogleSignInInitialized(true);
    });
    document.head.appendChild(script);
  }, []);

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
          document.getElementById("headerSignIn"),
          { theme: "outline", size: "medium" },
        );
      } else {
        window.google.accounts.id.renderButton(
          document.getElementById("headerSignIn"),
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
      <Header isDesktop={isDesktop} user={user} handleSignOut={handleSignOut} />
      {!isDesktop && (
        <MobileNavBar
          filterAmiibos={filterAmiibos}
          setIsAscending={setIsAscending}
          setSortBy={setSortBy}
          isSignedIn={user !== undefined}
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
      <Outlet
        context={{
          user,
          amiiboList,
          setAmiiboList,
          filteredAmiiboList,
          amiiboBackgroundColors,
          setAmiiboBackgroundColor,
          isDesktop,
          setSortBy,
          setIsAscending,
          filterAmiibos,
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
      <Footer />
    </div>
  );
}

export default App;
