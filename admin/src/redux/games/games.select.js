/**
 * product selector
 */


import findById from "../../utils/findById";

import { createSelector } from "reselect";

const seletcGames = state => state.games;

export const selectGamesCollections = createSelector(
    [seletcGames],
    games => games.collections
);


export const selectGamesIsFetching = createSelector(
    [seletcGames],
    games => games.isFetching
);

export const selectGamesById = gameId => createSelector(
    [selectGamesCollections],
    collections => findById(gameId, collections)
)

export const selectGameIsLoaded = createSelector(
    [seletcGames],
    games => !!games.collections
);


