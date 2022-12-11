/**
 * Product reducer
 */
import GamesType from "./games.type";

const INITAL_STATE = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
}

const gamesReducer = (state=INITAL_STATE, action) => {
    switch(action.type) {
        case (GamesType.FETCH_GAMES_START):
            return {
                ...state,
                isFetching: true
            }
        case (GamesType.FETCH_GAMES_SUCCESS):
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case (GamesType.FETCH_GAMES_ERROR):
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default gamesReducer;

