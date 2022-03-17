import React from "react"
import SpotForm from "./NewSpotForm"
import './NewSpot.css'

const NewSpot = () => {
    return (
        <div className="hosting_body_container">
            <div className="left_side">
                <h2>Let us know about your spot</h2>
            </div>

            <div className="right_side">
                <h2>new spot form</h2>
                <div className="form_div">
                    <SpotForm />
                </div>
            </div>
        </div>
    )
}

export default NewSpot
