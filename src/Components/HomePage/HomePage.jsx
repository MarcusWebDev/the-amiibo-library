import React from "react";
import Carousel from "react-multi-carousel";
import { useOutletContext } from "react-router-dom";

import "./HomePage.scss";
import "react-multi-carousel/lib/styles.css";

import AmiiboCard from "../AmiiboCard";
import LargeCarouselItem from "../LargeCarouselItem";
import LoadingSpinnerWrapper from "../LoadingSpinnerWrapper";

const responsiveLarge = {
  all: {
    breakpoint: { max: Number.MAX_SAFE_INTEGER, min: 0 },
    items: 1,
  },
};

const responsiveSmall = {
  largeDesktop: {
    breakpoint: { max: Number.MAX_SAFE_INTEGER, min: 1450 },
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

const HomePage = () => {
  const { amiiboList } = useOutletContext();
  const numToDisplay = 10;
  const sortedAmiiboList = new Array(amiiboList)[0]
    .sort((a, b) => new Date(b.release.na) - new Date(a.release.na))
    .slice(0, 10);
  const [mostCollected, setMostCollected] = React.useState([]);
  const [leastCollected, setLeastCollected] = React.useState([]);

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
    <div className="HomePage">
      <LoadingSpinnerWrapper
        className="loading-container"
        isLoading={!amiiboList.length}
      >
        <Carousel
          responsive={responsiveLarge}
          className="main-carousel"
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
        <h2 className="collection-header">Most Collected</h2>
        <Carousel responsive={responsiveSmall}>
          {mostCollected
            .map((MCAmiibo) => {
              const amiiboData = amiiboList.find(
                (amiibo) =>
                  MCAmiibo.external_id === "" + amiibo.head + amiibo.tail,
              );

              return (
                amiiboData && (
                  <AmiiboCard
                    amiibo={amiiboData}
                    key={"" + amiiboData.head + amiiboData.tail}
                  />
                )
              );
            })
            .filter((amiiboCard) => amiiboCard)}
        </Carousel>
        <h2 className="collection-header">Least Collected</h2>
        <Carousel responsive={responsiveSmall}>
          {leastCollected
            .map((LCAmiibo) => {
              const amiiboData = amiiboList.find(
                (amiibo) =>
                  LCAmiibo.external_id === "" + amiibo.head + amiibo.tail,
              );

              return (
                amiiboData && (
                  <AmiiboCard
                    amiibo={amiiboData}
                    key={"" + amiiboData.head + amiiboData.tail}
                  />
                )
              );
            })
            .filter((amiiboCard) => amiiboCard)}
        </Carousel>
      </LoadingSpinnerWrapper>
    </div>
  );
};

export default HomePage;
