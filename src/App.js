import logo from './logo.svg';
import AmiiboCard from "./Components/AmiiboCard/AmiiboCard.js";
import MobileNavBar from "./Components/MobileNavBar/MobileNavBar.js";
import Header from "./Components/Header/Header.js";
import { useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

let amiibo = {
  amiiboSeries: "Legend Of Zelda",
  character: "Zelda",
  gameSeries: "The Legend of Zelda",
  head: "01010000",
  image: "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01010000-03520902.png",
  name: "Toon Zelda - The Wind Waker",
  release: {
      au: "2016-12-03",
      eu: "2016-12-02",
      jp: "2016-12-01",
      na: "2016-12-02"
  },
  tail: "03520902",
  type: "Figure"
}



function App() {
  const [amiiboList, setAmiiboList] = useState([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    fetch("https://amiiboapi.com/api/amiibo/?showusage")
      .then((response) => response.json())
      .then((json) => setAmiiboList(json.amiibo.filter(amiibo => amiibo.type === "Figure")))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <Header isDesktop={isDesktop} />

      {
        !isDesktop && <MobileNavBar />
      }

      <Outlet context={amiiboList}/>

    </div>
  );
}

export default App;
