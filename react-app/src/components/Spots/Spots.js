import React from "react"
import './Spots.css'


const Spots = () => {
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
