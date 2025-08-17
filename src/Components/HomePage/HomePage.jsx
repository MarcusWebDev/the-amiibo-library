import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard";
import LargeCarouselItem from "../LargeCarouselItem";
import "./HomePage.scss";

const HomePage = () => {
  const { amiiboList } = useOutletContext();
  const numToDisplay = 10;
  const sortedAmiiboList = new Array(amiiboList)[0]
    .sort((a, b) => new Date(b.release.na) - new Date(a.release.na))
    .slice(0, 10);
  const [mostCollected, setMostCollected] = React.useState([]);
  const [leastCollected, setLeastCollected] = React.useState([]);

  const responsiveLarge = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  const responsiveSmall = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 1450 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1450, min: 1225 },
      items: 5,
    },
    smallDesktop: {
      breakpoint: { max: 1225, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 750 },
      items: 3,
    },
    smallTablet: {
      breakpoint: { max: 750, min: 560 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 560, min: 0 },
      items: 1,
    },
  };

  React.useEffect(() => {
    fetch(
      `https://api.amiibolibrary.com/amiibo/mostCollected/${numToDisplay}`,
      {
        method: "GET",
      },
    )
      .then((response) => response.json())
      .then((json) => setMostCollected(json))
      .catch((e) => console.error(e));
  }, []);

  React.useEffect(() => {
    fetch(
      `https://api.amiibolibrary.com/amiibo/leastCollected/${numToDisplay}`,
      {
        method: "GET",
      },
    )
      .then((response) => response.json())
      .then((json) => setLeastCollected(json))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="homePageContainer">
      <Carousel
        responsive={responsiveLarge}
        className="homePageFirstCarousel"
        autoPlay={true}
        infinite={true}
        autoPlaySpeed={7000}
      >
        {sortedAmiiboList.map((amiibo) => {
          return (
            <LargeCarouselItem
              amiibo={amiibo}
              key={"" + amiibo.head + amiibo.tail}
            />
          );
        })}
      </Carousel>
      <h2 className="homePageCollectionHeader">Most Collected</h2>
      <Carousel
        responsive={responsiveSmall}
        className="homePageCollectionCarousel"
      >
        {amiiboList
          .filter((amiibo) =>
            mostCollected.some(
              (MCAmiibo) =>
                MCAmiibo.external_id == "" + amiibo.head + amiibo.tail,
            ),
          )
          .map((amiibo) => {
            let count;
            for (let i = 0; i < mostCollected.length; i++) {
              if (
                mostCollected[i].external_id ==
                "" + amiibo.head + amiibo.tail
              ) {
                count = mostCollected[i].count;
                break;
              }
            }

            return { ...amiibo, count: count };
          })
          .sort((a, b) => b.count - a.count)
          .map((amiibo) => {
            return (
              <AmiiboCard
                amiibo={amiibo}
                key={"" + amiibo.head + amiibo.tail}
              />
            );
          })}
      </Carousel>
      <h2 className="homePageCollectionHeader">Least Collected</h2>
      <Carousel
        responsive={responsiveSmall}
        className="homePageCollectionCarousel"
      >
        {amiiboList
          .filter((amiibo) =>
            leastCollected.some(
              (LCAmiibo) =>
                LCAmiibo.external_id == "" + amiibo.head + amiibo.tail,
            ),
          )
          .map((amiibo) => {
            let count;
            for (let i = 0; i < leastCollected.length; i++) {
              if (
                leastCollected[i].external_id ==
                "" + amiibo.head + amiibo.tail
              ) {
                count = leastCollected[i].count;
                break;
              }
            }

            return { ...amiibo, count: count };
          })
          .sort((a, b) => a.count - b.count)
          .map((amiibo) => {
            return (
              <AmiiboCard
                amiibo={amiibo}
                key={"" + amiibo.head + amiibo.tail}
              />
            );
          })}
      </Carousel>
    </div>
  );
};

export default HomePage;
