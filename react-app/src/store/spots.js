const CREATE = 'spots/CREATE';
const GET_ALL = 'spots/GET_ALL';
const GET_ONE = 'spots/GET_ONE';
const UPDATE = 'spots/UPDATE';
const DELETE = 'spots/DELETE';

const create = spot => ({ type: CREATE, spot });
const getAll = spots => ({ type: GET_ALL, spots });
const getOne = spot => ({ type: GET_ONE, spot });
const update = spot => ({ type: UPDATE, spot });
const destroy = spotId => ({ type: DELETE, spotId });

//create spot thunk
export const createSpot = (spot) => async (dispatch) => {
    const response = await fetch(`/api/spots/new`, {
        method: 'POST',
        body: spot
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(create(data));
        return data
    } else {
        const dataError = await response.json()
        if (dataError.errors) {
            return {'errors': dataError.errors};
        } else {
            return {'errors': 'Something went wrong. Please try again'}
        }
    }
};

//get spots thunk
export const getAllSpots = () => async (dispatch) => {
    const response = await fetch(`/api/spots/all`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAll(data));
        return data;
    };
    return response;
};

//get one spot thunk
export const getOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'GET'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getOne(data));
        return data;
    };
    return response;
};

//update spot thunk
export const updateSpot = (spot, spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        body: spot
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

//delete spot thunk
export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(destroy(data));
        return data;
    };
    return response;
};

const spotReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case CREATE:
            newState = state;
            newState[action.spot.id] = action.spot;
            return newState;
        case GET_ALL:
            newState = {};
            action.spots['all_spots'].forEach(spot => newState[spot.id] = spot);
            return newState

        case GET_ONE:
            newState = {...state};
            newState[action.spot.id] = action.spot;
        return newState;
        case UPDATE:
            newState = state;
            newState[action.spot.id] = action.spot;
            return newState;
        case DELETE:
            newState = state;
            delete newState[action.spotId.id];
            return newState
        default:
            return state
    };
};

export default spotReducer
