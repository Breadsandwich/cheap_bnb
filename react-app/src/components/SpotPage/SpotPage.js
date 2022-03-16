import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";

const SpotPage = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector((state) => state?.session?.user)
    console.log('who is session user:  ', sessionUser.id, sessionUser.username)

    const spot = useSelector(state => state?.spot[spotId]);
    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    return (
        <div>just a spot..</div>
    )
}

export default SpotPage;
