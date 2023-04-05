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
  const [amiiboBackgroundColors, setAmiiboBackgroundColors] = useState([])
  const [isDesktop, setIsDesktop] = useState(false);

  const filterAmiibos = (searchString) => {
    setFilteredAmiiboList(amiiboList.filter((amiibo) => amiibo.character.toLowerCase().includes(searchString) || amiibo.amiiboSeries.toLowerCase().includes(searchString)))
  }
  const setAmiiboBackgroundColor = (amiibo, color) => {
    /*let newArray = [...amiiboBackgroundColors];
    newArray[amiiboList.indexOf(amiibo)] = color;*/

    setAmiiboBackgroundColors((prevState) => {
      let newArray = [...prevState];
      newArray[amiiboList.indexOf(amiibo)] = color;
      return newArray;
    });
  }

  useEffect(() => {
    fetch("https://amiiboapi.com/api/amiibo/?showusage")
      .then((response) => response.json())
      .then((json) => {
        let figures = json.amiibo.filter(amiibo => amiibo.type === "Figure");
        setAmiiboList(figures);
        setFilteredAmiiboList(figures);
        setAmiiboBackgroundColors(new Array(figures.length).fill([]));
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <Header isDesktop={isDesktop} />

      {
        !isDesktop && <MobileNavBar filterAmiibos={filterAmiibos}/>
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
