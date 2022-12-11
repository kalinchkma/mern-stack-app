/**
 * Product actions
 */
import GamesType from "./games.type";
import config from "../../config";

export const fetchGamesStart = () => ({
    type: GamesType.FETCH_GAMES_START
});


export const fetchGamesSuccess = (gamesMap) => ({
    type: GamesType.FETCH_GAMES_SUCCESS,
    payload: gamesMap
});

export const fetchGamesError = (errorMessage) => ({
    type: GamesType.FETCH_GAMES_ERROR,
    payload: errorMessage
});

export const fetchGamesStartAsync =  () => {
    return  async dispatch =>  {
       
        dispatch(fetchGamesStart());
        
        try {
            const res = await fetch(`${config.API_DOMAIN}/game`,{
                method: "GET"
            });
            const result = await res.json();
            if(res.status === 200) {
                dispatch(fetchGamesSuccess(result.success.games));
            } else {
                dispatch(fetchGamesError(result.errors));
            }

        } catch(err) {
            dispatch(fetchGamesError(err));
        }

    }
}

