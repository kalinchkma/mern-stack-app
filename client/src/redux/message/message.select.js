/**
 * message selector
 */

import { createSelector } from "reselect";

const selectMessage = state => state.message;


export const selectAllMesssages = createSelector(
    [selectMessage],
    message => message.messages
);

export const selectMessageIsFetching = createSelector(
    [selectMessage],
    message => message.isFetching
);


