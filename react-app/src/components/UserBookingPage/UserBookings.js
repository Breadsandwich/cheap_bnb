import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBookings } from "../../store/booking";
import { useParams } from "react-router-dom";


const UserBookings = () => {
    const dispatch = useDispatch();
    const {userId} = useParams()
    const bookingsObj = useSelector(state => state?.bookingReducer);
    const bookings = bookingsObj && Object.values(bookingsObj)

    console.log('@@@@@',bookings)


    useEffect(() => {
        dispatch(getBookings(userId));
    }, [dispatch, userId])


    return (
        <div>
            <h1>user bookings page</h1>
            <div className="user_bookings">
                {bookings.map((booking) => (
                    <div key={booking?.id} className='booking_cards'>
                        <div className='booking_card_img'>
                            <img src={booking.spot.image_url} alt={booking.spot.spot_name} />
                        </div>
                        <h3>{booking.spot.spot_name} - ${booking.spot.price}/day</h3>
                        <p>{booking.spot.address}, {booking.spot.city}, {booking.spot.state}</p>
                        <div className="date_box">
                            <p>check-in: {booking.start_date} | checkout: {booking.end_date}</p>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default UserBookings
