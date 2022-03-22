import React from "react";

import './CreateBooking.css'

const CreateBookingComponent = () => {
    return (
        <>
            <div className="booking_container">
                <form className="booking_form">
                    <div className="dates_container">
                        <input type="date" placeholder="start date"/>
                        <input type="date" placeholder="end date" />
                    </div>
                    <div className="guests_container">
                        <input type="number" placeholder="guests" />
                    </div>

                    <button>Reserve</button>
                </form>
            </div>
        </>
    )
}

export default CreateBookingComponent
