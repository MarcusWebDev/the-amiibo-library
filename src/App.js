import logo from './logo.svg';
import AmiiboCard from "./Components/AmiiboCard/AmiiboCard.js";
import MobileNavBar from "./Components/MobileNavBar/MobileNavBar.js";
import Header from "./Components/Header/Header.js";
import Footer from './Components/Footer/Footer';
import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  const [amiiboList, setAmiiboList] = useState([]);
  const [filteredAmiiboList, setFilteredAmiiboList] = useState([]);
  const [amiiboBackgroundColors, setAmiiboBackgroundColors] = useState(new Map());
  const [sortBy, setSortBy] = useState("characterName");
  const [isAscending, setIsAscending] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);


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

  return (
    <div className="App">
      <Header isDesktop={isDesktop} />

      {
        !isDesktop && <MobileNavBar filterAmiibos={filterAmiibos} setIsAscending={setIsAscending} setSortBy={setSortBy}/>
      }

      <Outlet context={{
        amiiboList: amiiboList, 
        filteredAmiiboList: filteredAmiiboList, 
        amiiboBackgroundColors: amiiboBackgroundColors,
        setAmiiboBackgroundColor: setAmiiboBackgroundColor}}
      />
      <Footer />
    </div>
  );
}

export default App;
