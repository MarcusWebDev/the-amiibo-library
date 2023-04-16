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
  const [isDesktop, setIsDesktop] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({innerHeight: window.innerHeight, innerWidth: window.innerWidth});
  const [googleSignInInitialized, setGoogleSignInInitialized] = useState(false);
  const [user, setUser] = useState(null);


  const filterAmiibos = (searchString) => {
    setSearchText(searchString);
    setFilteredAmiiboList(amiiboList.filter((amiibo) => amiibo.character.toLowerCase().includes(searchString) || amiibo.amiiboSeries.toLowerCase().includes(searchString)).sort(amiiboComparator));
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
  }

  const setAmiiboBackgroundColor = (amiibo, color) => {
    setAmiiboBackgroundColors((prevState) => {
      let newMap = new Map(prevState);
      newMap.set("" + amiibo.head + amiibo.tail, color);
      return newMap;
    });
  }

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  const handleSignOut = () => {
    setUser(null);
  }

  useEffect(() => {
    filterAmiibos(searchText);
  }, [sortBy, isAscending]);

  useEffect(() => {
    fetch("https://amiiboapi.com/api/amiibo/?showusage")
      .then((response) => response.json())
      .then((json) => {
        let figures = json.amiibo.filter(amiibo => amiibo.type === "Figure");
        setAmiiboList(figures);
        setFilteredAmiiboList(figures.sort(amiiboComparator));
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
        !isDesktop && <MobileNavBar filterAmiibos={filterAmiibos} setIsAscending={setIsAscending} setSortBy={setSortBy}/>
      }

      <Outlet context={{
        user: user,
        amiiboList: amiiboList, 
        filteredAmiiboList: filteredAmiiboList, 
        amiiboBackgroundColors: amiiboBackgroundColors,
        setAmiiboBackgroundColor: setAmiiboBackgroundColor,
        isDesktop: isDesktop,
        setSortBy: setSortBy,
        setIsAscending: setIsAscending,
        filterAmiibos: filterAmiibos}}
      />
      <Footer />
    </div>
  );
}

export default App;
