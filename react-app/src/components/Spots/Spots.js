import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpots } from "../../store/spots";
import './Spots.css'


const Spots = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state?.spotReducer);
    const spots = spotsObj && Object.values(spotsObj)
    console.log('spots?? @@@@@@@@@@@@', spotsObj)


    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <div className="spots_body_container">
            <div className="left_container">
                <h1>left container</h1>
                <div className="all_spots_container">
                    <div className="spot_box">some listed spot to map</div>
                    <div className="spot_box">some listed spot to map</div>
                    <div className="spot_box">some listed spot to map</div>
                    <div className="spot_box">some listed spot to map</div>
                </div>
            </div>

            <div className="right_container">
                <h1>image or map as stretch goal</h1>
            </div>
        </div>

    )
}

export default Spots
