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
    // console.log('spots?? @@@@@@@@@@@@', spots)


    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch])

    return (
        <div className="spots_body_container">
            <div className="left_container">
                <h1>left container</h1>
                <div className="all_spots_container">
                    {spots.map((spot) => (
                        <a key={spot?.id} href={`/spots/${spot?.id}`}>
                            <div className="spot_box">
                                <div className="spot_name">
                                    <h3>{spot?.spot_name}</h3>
                                    <p>host name here</p>
                                </div>
                                <div>
                                    <img
                                        className="spot_img"
                                        src={spot?.image_url} alt="spot_image"
                                        onError={e => e.target.style.display = 'none'}
                                    />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div className="right_container">
                <h1>image or map as stretch goal</h1>
            </div>
        </div>

    )
}

export default Spots
