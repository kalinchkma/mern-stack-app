/**
 * announcement selector
 */

 import { createSelector } from "reselect";


const selectConfig = state => state.config;

export const selectAllConfig = createSelector(
    [selectConfig],
    config => config.configs
);

export const selectConfigIsfetching = createSelector(
    [selectConfig],
    config => config.isFetching
);


