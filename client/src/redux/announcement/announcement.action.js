/**
 * announcement action
 */

 import config from "../../config";
 import AnnouncementType from "./announcement.type";

 export const fetchAnnouncementStart = () => ({
    type: AnnouncementType.FETCH_ANNOUNCEMENT_START
 });

 export const fetchAnnouncementSuccess = (announcements) => ({
    type: AnnouncementType.FETCH_ANNOUNCEMENT_SUCCESS,
    payload: announcements
 });


 export const fetchAnnouncementError = (message) => ({
    type: AnnouncementType.FETCH_ANNOUNCEMENT_ERROR,
    payload: message
 });


 export const fetchAnnouncementStartAsync = () => {
    return async (dispatch) => {
        dispatch(fetchAnnouncementStart());
        try {
            const res = await fetch(`${config.API_DOMAIN}/announcement`, {
                method: "GET"
            });
            const result = await res.json();
            if(res.status === 200) {
                dispatch(fetchAnnouncementSuccess(result.success.announcements));
            } else {
                dispatch(fetchAnnouncementError(res.errors.msg));
            }
        } catch(err) {
            dispatch(fetchAnnouncementError(err))
        }
    }
 }