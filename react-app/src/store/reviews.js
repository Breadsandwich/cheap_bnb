
const CREATE = 'reviews/CREATE'
const GET_ALL = 'reviews/GET_ALL'
const UPDATE = 'reviews/UPDATE'
const DELETE = 'reviews/DELETE'

const create = review => ({ type: CREATE, review });
const getAll = reviews => ({ type: GET_ALL, reviews });
const update = review => ({ type: UPDATE, review });
const destroy = reviewId => ({ type: DELETE, reviewId });


export const createReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });

    // console.log('from createReview thunk:',response)

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


export const getReviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
        return data;
    };
    return response;
};


export const updateReview = (payload) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(payload)
        // body: payload
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


export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    // console.log('response from delete review thunk:', response)

    if (response.ok) {
        const data = await response.json();
        dispatch(destroy(data));
        return data;
    };
    return response;
};


const reviewReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = state;
            newState[action.review.id] = action.review;
            return newState;
        case GET_ALL:
            newState = {};
            action.reviews['spot_reviews'].forEach(review => newState[review.id] = review);
            return newState
        case UPDATE:
            newState = state;
            newState[action.review.id] = action.review;
            return newState;
        case DELETE:
            newState = {...state};
            delete newState[action.reviewId.id];
            return newState
        default:
            return state
    };
};

export default reviewReducer
