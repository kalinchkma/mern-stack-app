/**
 * users selector
 */
import { createSelector } from "reselect";
import findById from "../../utils/findById";

const selectUsers = state => state.users;

export const selectUsersList = createSelector(
    [selectUsers],
    users => users.users
);

export const selectUsersIsFetching = createSelector(
    [selectUsers],
    users => users.isFetching
);


export const selectUsersById = userId => createSelector(
    [selectUsersList],
    users => findById(userId, users)
)

export const selectUsersIsLoaded = createSelector(
    [selectUsersList],
    users => !!users
);







