import { Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import MobileNavBar from "./Components/MobileNavBar/MobileNavBar.js";
import Header from "./Components/Header/Header.js";
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [amiiboList, setAmiiboList] = useState([]);
  const [filteredAmiiboList, setFilteredAmiiboList] = useState([]);
  const [amiiboBackgroundColors, setAmiiboBackgroundColors] = useState(new Map());
  const [sortBy, setSortBy] = useState("characterName");
  const [isAscending, setIsAscending] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [addRemoveEnabled, setAddRemoveEnabled] = useState(false);
  const [selectedAmiiboIDs, setSelectedAmiiboIDs] = useState(new Set());
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({innerHeight: window.innerHeight, innerWidth: window.innerWidth});
  const [googleSignInInitialized, setGoogleSignInInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [showOwned, setShowOwned] = useState(true);
  const [showUnowned, setShowUnowned] = useState(true);

  const filterAmiibos = (initialString) => {
    let searchString = initialString.toLowerCase();
    setSearchText(searchString);

    if (showOwned && showUnowned) {
      setFilteredAmiiboList(amiiboList.filter((amiibo) => amiibo.character.toLowerCase().includes(searchString) || amiibo.amiiboSeries.toLowerCase().includes(searchString)).sort(amiiboComparator));  
    } 
    else if (showOwned && !showUnowned) {
      setFilteredAmiiboList(amiiboList.filter((amiibo) => amiibo.collected && (amiibo.character.toLowerCase().includes(searchString) || amiibo.amiiboSeries.toLowerCase().includes(searchString))).sort(amiiboComparator));
    }
    else if (!showOwned && showUnowned) {
      setFilteredAmiiboList(amiiboList.filter((amiibo) => !amiibo.collected && (amiibo.character.toLowerCase().includes(searchString) || amiibo.amiiboSeries.toLowerCase().includes(searchString))).sort(amiiboComparator));
    }
    else {
      setFilteredAmiiboList([]);
    }
  }

  const toggleSelectedAmiiboCollection = async (selectedIDs) => {
    let databaseRequestArray = [];
    let newArray = amiiboList.map((amiibo) => {
        if (selectedIDs.has("" + amiibo.head + amiibo.tail)) {
            let newAmiibo = {...amiibo, collected: !amiibo.collected};
            databaseRequestArray.push(newAmiibo);
            return newAmiibo;
        }
        else {
            return amiibo;
        }
    });

    let requestComplete = false;
    
    await fetch("http://api.amiibolibrary.com:4000/collection", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        user: user,
        amiibos: databaseRequestArray
      })
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(() => requestComplete = true)
    .catch((e) => console.log(e));

    setSelectedAmiiboIDs(new Set());

    if (requestComplete) {
      return newArray;
    }
    else {
      return amiiboList;
    }
  }

  const amiiboComparator = (a, b) => {
    if (sortBy == "releaseDate") {
      if (isAscending) {
        return new Date(a.release.na) - new Date(b.release.na);
      }
      else {
        return new Date(b.release.na) - new Date(a.release.na);
      }
    } 
    else if (sortBy == "characterName") {
      if (isAscending) {
        if (a.character > b.character) {
          return 1;
        }
        else if (a.character < b.character) {
          return -1;
        }
        else {
          return 0;
        }
      } 
      else {
        if (a.character > b.character) {
          return -1;
        }
        else if (a.character < b.character) {
          return 1;
        }
        else {
          return 0;
        }
      }

    }
    else if (sortBy == "amiiboSeries") {
      if (isAscending) {
        if (a.amiiboSeries > b.amiiboSeries) {
          return 1;
        }
        else if (a.amiiboSeries < b.amiiboSeries) {
          return -1;
        }
        else {
          return 0;
        }
      } 
      else {
        if (a.amiiboSeries > b.amiiboSeries) {
          return -1;
        }
        else if (a.amiiboSeries < b.amiiboSeries) {
          return 1;
        }
        else {
          return 0;
        }
      }
    }
    else {
      console.log("Error: invalid sortBy");
    }
  }
  

  const setAmiiboBackgroundColor = (amiibo, color) => {
    setAmiiboBackgroundColors((prevState) => {
      let newMap = new Map(prevState);
      newMap.set("" + amiibo.head + amiibo.tail, color);
      return newMap;
    });
  }

  const handleCallbackResponse = (response) => {
    var userObject = jwt_decode(response.credential);;
    setUser(userObject);
  }

  const handleSignOut = () => {
    setUser(null);
  }

  useEffect(() => {
    filterAmiibos(searchText);
  }, [amiiboList, showOwned, showUnowned]);

  useEffect(() => {
    if (user != null) {
      fetch("http://api.amiibolibrary.com:4000/signIn", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user: user
        })
      })
      .then(() => {
        return fetch(`http://api.amiibolibrary.com:4000/amiibo/${user.email}`, {
          method: "GET"
        });
      })
      .then(async (response) => {
         let responseObject = {
          status: response.status,
          json: await response.json()
        }

        return responseObject;
      })
      .then(({status, json}) => {
        let newArray = [...amiiboList];
        for (let i = 0; i < amiiboList.length; i++) {
          if (status == 200 && json.includes("" + amiiboList[i].head + amiiboList[i].tail)) {
            newArray[i].collected = true;
          }
          else {
            newArray[i].collected = false;
          }
        }

        setAmiiboList(newArray);
        const sortedNewArray = [...newArray].sort(amiiboComparator);
        setFilteredAmiiboList(sortedNewArray);
      })
      .catch((e) => console.log(e));
    }
  }, [user]);

  useEffect(() => {
    filterAmiibos(searchText);
  }, [sortBy, isAscending]);

  useEffect(() => {
    fetch("https://amiiboapi.com/api/amiibo/?showusage")
      .then((response) => response.json())
      .then((json) => {
        const figures = json.amiibo.filter(amiibo => amiibo.type === "Figure");
        setAmiiboList(figures);
        const sortedFigures = [...figures].sort(amiiboComparator)
        setFilteredAmiiboList(sortedFigures);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    let script = document.createElement('script');
    script.setAttribute("src", "https://accounts.google.com/gsi/client");
    script.setAttribute("id", "googleScript");
    script.setAttribute("async", "true");
    script.setAttribute("defer", "true");
    script.addEventListener("load", () => {
      window.google.accounts.id.initialize({
        client_id: "551904080519-u8me401rq4adum4bvqnafig5dn2e2095.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      setGoogleSignInInitialized(true);
    });
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (windowDimensions.innerWidth < 1024) {
      setIsDesktop(false);
    }
    else {
      setIsDesktop(true);
    }
  }, [windowDimensions])

  useEffect(() => {
    if (googleSignInInitialized && user == null) {
      if (isDesktop) {
        window.google.accounts.id.renderButton(
          document.getElementById("headerSignIn"),
          {theme: "outline", size: "medium"}
        );
      }
      else {
        window.google.accounts.id.renderButton(
          document.getElementById("headerSignIn"),
          {theme: "outline", size: "medium", type: "icon"}
        );
      }
    }
  }, [isDesktop, googleSignInInitialized, user]);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowDimensions({innerHeight: window.innerHeight, innerWidth: window.innerWidth}));

    return window.removeEventListener('resize', () => setWindowDimensions({innerHeight: window.innerHeight, innerWidth: window.innerWidth}));
  }, [])

  return (
    <div className="App">
      <Header isDesktop={isDesktop} user={user} handleSignOut={handleSignOut} />

      {
        !isDesktop && 
          <MobileNavBar 
            filterAmiibos={filterAmiibos} 
            setIsAscending={setIsAscending} 
            setSortBy={setSortBy} 
            isSignedIn={user != null}
            toggleSelectedAmiiboCollection={toggleSelectedAmiiboCollection} 
            addRemoveEnabled={addRemoveEnabled}
            setAddRemoveEnabled={setAddRemoveEnabled} 
            setAmiiboList={setAmiiboList}
            selectedAmiiboIDs={selectedAmiiboIDs}
            showOwned={showOwned}
            showUnowned={showUnowned}
            setShowOwned={setShowOwned}
            setShowUnowned={setShowUnowned}
          />
      }

      <Outlet context={{
        user: user,
        amiiboList: amiiboList, 
        setAmiiboList: setAmiiboList,
        filteredAmiiboList: filteredAmiiboList, 
        amiiboBackgroundColors: amiiboBackgroundColors,
        setAmiiboBackgroundColor: setAmiiboBackgroundColor,
        isDesktop: isDesktop,
        setSortBy: setSortBy,
        setIsAscending: setIsAscending,
        filterAmiibos: filterAmiibos,
        searchText: searchText,
        addRemoveEnabled: addRemoveEnabled,
        setAddRemoveEnabled: setAddRemoveEnabled,
        toggleSelectedAmiiboCollection: toggleSelectedAmiiboCollection,
        selectedAmiiboIDs: selectedAmiiboIDs,
        setSelectedAmiiboIDs: setSelectedAmiiboIDs,
        showOwned: showOwned,
        setShowOwned: setShowOwned, 
        showUnowned: showUnowned,
        setShowUnowned: setShowUnowned
        }}
      />
      <Footer />
    </div>
  );
}

export default App;
