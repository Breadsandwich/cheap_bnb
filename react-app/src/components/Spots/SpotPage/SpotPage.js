import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../../store/spots";
import SpotFormModal from "./SpotModal";
import { SpotDeleteButton } from "../../utils/Buttons";
import ReviewsComponent from "../../Reviews/Reviews";
// import CreateBookingComponent from "../../Bookings/CreateBooking";
import './SpotPage.css'


const SpotPage = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state?.session?.user)
    console.log('who is session user:  ', sessionUser)

    useEffect(() => { dispatch(getOneSpot(spotId)) }, [ dispatch, spotId ])
    const spot = useSelector(state => state?.spotReducer[spotId])




    return (
        <div className="spot_body">
            <div>

            <h1>{spot?.spot_name}</h1>
            <p>{spot?.address}, {spot?.city}, {spot?.state}</p>
            <div className="images_container">
                <div>
                    <img src={spot?.image_url} alt="spot_image" id="spot_img" />
                </div>

            </div>
            <div>
                <h2>Hosted by: {spot?.host}</h2>
                <p>guest limit: {spot?.guest_limit} persons</p>
                <p>Description of spot: {spot?.description}</p>
                <h4>book for: ${spot?.price}/night</h4>
            </div>
            <div className="owner_btns">
            {sessionUser?.id === spot?.user_id && <>
                <SpotFormModal name='Edit Spot' edit={true} spot={spot}/>
                <SpotDeleteButton spotId={spot?.id} />
            </>}
            </div>

            <hr className="seperator"/>


            <h1>reviews</h1>
            <div className="reviews_container">
                <div>
                    <ReviewsComponent spot={spot}/>
                </div>
            </div>
            </div>

        </div>
    )
}

export default SpotPage;
