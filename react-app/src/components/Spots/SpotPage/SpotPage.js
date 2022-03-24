import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../../store/spots";
import SpotFormModal from "./SpotModal";
import { SpotDeleteButton } from "../../utils/Buttons";
import ReviewsComponent from "../../Reviews/Reviews";
// import { useHistory } from "react-router-dom";
// import CreateBookingComponent from "../../Bookings/CreateBooking";
import no_image from '../../../images/image-not-found.png'
import './SpotPage.css'


const SpotPage = () => {
    // const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state?.session?.user)
    const spot = useSelector(state => state?.spotReducer[spotId])
    // console.log('what is spotId:  ', spotId)

    useEffect(() => { dispatch(getOneSpot(spotId)) }, [ dispatch, spotId ])

    console.log('from spot page',spotId)


    return (
        <>
        <div className="spot_body">
            <div>

            <h1>{spot?.spot_name}</h1>
            <p>{spot?.address}, {spot?.city}, {spot?.state}</p>
            <div className="images_container">
                <div>
                    <div
                        style={{
                            width:'100%',
                            height:'690px',
                            backgroundImage: `url(${spot?.image_url !== 'no data provided' ? spot?.image_url : no_image})`,
                            backgroundSize: 'cover',
                            borderRadius: '2%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'

                        }}
                    >

                    </div>
                    {/* <img src={spot?.image_url !== 'no data provided' ? spot?.image_url : no_image} alt="spot_image" id="spot_img" /> */}
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
        </>

    )
}

export default SpotPage;
