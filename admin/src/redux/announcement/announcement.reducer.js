/**
 * announcement reducer
 */
import AnnouncementType from "./announcement.type";

const INITAL_STATE = {
    announcements: null,
    isFetching: false,
    errorMessage: undefined
}


const announcementReducer = (state=INITAL_STATE, action) => {
    switch(action.type) {
        case AnnouncementType.FETCH_ANNOUNCEMENT_START:
            return {
                ...state,
                isFetching: true
            }
        case AnnouncementType.FETCH_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                announcements: action.payload,
                isFetching: false
            }
        case AnnouncementType.FETCH_ANNOUNCEMENT_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default announcementReducer;
