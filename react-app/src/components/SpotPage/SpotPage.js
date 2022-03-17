import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getOneSpot } from "../../store/spots";

const SpotPage = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state?.session?.user)
    // console.log('who is session user:  ', sessionUser.id, sessionUser.username)

    useEffect(() => { dispatch(getOneSpot(spotId)) }, [ dispatch, spotId ])
    const spot = useSelector(state => state?.spotReducer[spotId])
    console.log('spot object from spotpage: ',spot)


    return (
        <div>
            <div className="images_container">
            {spot?.images?.map((image) => (
                <div>
                    <img src={image} alt="spot_image" />
                </div>
            ))}
            </div>
            <h1>spot page</h1>
            <h1>{spot?.spot_name}</h1>
            <h2>Hosted by: {spot?.host}</h2>
            <h3>{spot?.address}, {spot?.city}, {spot?.state}</h3>
            <p>Description of spot: {spot?.description}</p>
            <h4>book for: ${spot?.price}/day</h4>
        </div>
    )
}

export default SpotPage;
