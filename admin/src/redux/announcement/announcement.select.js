/**
 * announcement selector
 */

 import { createSelector } from "reselect";


const selectAnnouncement = state => state.announcement;

export const selectAllAnnouncement = createSelector(
    [selectAnnouncement],
    announcement => announcement.announcements
);

export const selectAnnouncementIsfetching = createSelector(
    [selectAnnouncement],
    announcement => announcement.isFetching
);


