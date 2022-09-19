import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel'
import axios from "axios";
import { useState } from 'react';

//Style
import style from "../../assets/Style/Slider.module.scss"

// Function Component til slider
export const Slider = () => {
    //Usestate hook m getter og setter
    const [slider, setSlider] = useState([]);
    // useEffect hook - styring af renders
    useEffect(() => {
        //Async funktion til kald af api med hjælp fra appservice
        const getSlider = async () => {
            try {
                const result = await axios.get('https://api.mediehuset.net/');
                setSlider(result.data.items);
                //Hvis fejl vis i console
            } catch (error) {
                console.log(error)
            }
        }
        //Funktionskald 
        getSlider();
        // Dependency array - hvis det ændres renderes komponenten
    }, [setSlider]);

    //Return af vores inhold
    return (
        <header className={style.slider}>
            <Carousel className={style.slidercarousel}>

                {/* Mapper data */}
                {slider && slider.map((items) => {
                    return (
                        <div key={items.id}>
                            <img src={items.image[1]} alt="imgslider" width="100%"  ></img>

                        </div>
                    )
                })}
            </Carousel></header>
    )
}


