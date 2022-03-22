const CREATE = 'bookings/CREATE';
const GET_ALL = 'bookings/GET_ALL';
const UPDATE = 'bookings/UPDATE';
const DELETE = 'bookings/DELETE';

const create = booking => ({ type: CREATE, booking });
const getAll = bookings => ({ type: GET_ALL, bookings });
const update = booking => ({ type: UPDATE, booking });
const destroy = userId => ({ type: DELETE, userId });


export const createBooking = (booking) => async (dispatch) => {
    const response = await fetch(`/api/bookings/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data;
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};


export const getBookings = (userId) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${userId}`, {

    });

    console.log('from getBookings thunk: ', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
        return data
    }
    return response
}

export const updateBooking = (booking, id) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(booking)
        // body: booking
    });


    if (response.ok) {
        const data = await response.json();
        dispatch(update(data));
        return data;
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};


export const deleteBooking = (userId) => async (dispatch) => {
    const response = await fetch(`/api/bookings/${userId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(destroy(data));
        return data;
    };
    return response;
};


const bookingReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = state;
            newState[action.booking.id] = action.booking;
            return newState;
        case GET_ALL:
            newState = {};
            action.bookings['bookings'].forEach(booking => newState[booking.id] = booking);
            // action.bookings.forEach(booking => newState[booking.id] = booking)
            return newState

        case UPDATE:
            newState = state;
            newState[action.booking.id] = action.booking;
            return newState;
        case DELETE:
            newState = state;
            delete newState[action.userId.id];
            return newState
        default:
            return state
    };
};

export default bookingReducer
