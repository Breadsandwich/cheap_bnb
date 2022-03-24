import React from "react"
import './NewSpot.css'
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router-dom"
import SpotForm from "../SpotForm/Spot_form"

const NewSpot = () => {
    // const dispatch = useDispatch();
    // const { spotId } = useParams();
    // const sessionUser = useSelector((state) => state?.session?.user)


    return (
        <div className="hosting_body_container">
            <div className="left_side">
                <div className="left_image_container">
                    <h1>Tell us about your spot.</h1>
                </div>
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
