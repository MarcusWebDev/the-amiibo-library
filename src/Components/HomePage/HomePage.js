import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useOutletContext } from "react-router-dom";
import AmiiboCard from "../AmiiboCard/AmiiboCard";
import LargeCarouselItem from "../LargeCarouselItem/LargeCarouselItem";
import "./HomePage.css";



const HomePage = () => {
    const amiiboList = useOutletContext().amiiboList;
    const amiiboBackgroundColors = useOutletContext().amiiboBackgroundColors;
    const sortedAmiiboList = new Array(amiiboList)[0].sort((a, b) => new Date(b.release.na) - new Date(a.release.na)).slice(0, 7);
    const responsiveLarge = {
        all : {
            breakpoint: { max: 4000, min: 0},
            items: 1
        }
    };

    const responsiveSmall = {
        largeDesktop: {
            breakpoint: { max: 4000, min: 1450},
            items: 6
        },
        desktop: {
            breakpoint: { max: 1450, min: 1225},
            items: 5
        },
        smallDesktop: {
            breakpoint: { max: 1225, min: 1024},
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 750},
            items: 3
        },
        smallTablet: {
            breakpoint: { max: 750, min: 560},
            items: 2
        },
        mobile: {
            breakpoint: { max: 560, min: 0},
            items: 1
        }
    };




    return (
        <div className="homePageContainer">
            <Carousel responsive={responsiveLarge} className="homePageFirstCarousel" autoPlay={true} infinite={true} autoPlaySpeed={7000}>
                {
                    sortedAmiiboList.map((amiibo) => {
                        return (
                            <LargeCarouselItem amiibo={amiibo} key={"" + amiibo.head + amiibo.tail}/>
                        );
                        
                    })
                }  
            </Carousel>
            <h2 className="homePageCollectionHeader">Most Collected</h2>
            <Carousel responsive={responsiveSmall} className="homePageCollectionCarousel">
                {
                    sortedAmiiboList.map((amiibo) => {
                        return (
                            <AmiiboCard amiibo={amiibo} key={"" + amiibo.head + amiibo.tail}/>
                        );
                    })
                } 
            </Carousel>
            <h2 className="homePageCollectionHeader">Least Collected</h2>
            <Carousel responsive={responsiveSmall} className="homePageCollectionCarousel">
                {
                    sortedAmiiboList.map((amiibo) => {
                        return (
                            <AmiiboCard amiibo={amiibo} key={"" + amiibo.head + amiibo.tail}/>
                        );
                    })
                } 
            </Carousel>
        </div>
    );
}

export default HomePage;