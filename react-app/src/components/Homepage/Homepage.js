import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import './Homepage.css'



const Homepage = () => {


    return (
        <div className="homepage_body">
            <div className="black_background">
                <div className="big_card">
                    <div className="big_card_elements">
                        <h2>Let your curiosity do the booking</h2>
                        <button>I'm flexible</button>
                    </div>
                </div>
            </div>

            <div className="next_trip_container">
                <div className="next_trip_elements">
                    <h2>Inspiration for your next trip</h2>
                    <div className="inspiration_cards">
                        <div className="cards">card 1</div>
                        <div className="cards">card 2</div>
                        <div className="cards">card 3</div>
                        <div className="cards">card 4</div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Homepage
