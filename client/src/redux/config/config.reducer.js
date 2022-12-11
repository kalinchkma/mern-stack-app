/**
 * announcement reducer
 */
import ConfigType from "./config.type";

const INITAL_STATE = {
    configs: null,
    isFetching: false,
    errorMessage: undefined
}


const configReducer = (state=INITAL_STATE, action) => {
    switch(action.type) {
        case ConfigType.FETCH_CONFIG_START:
            return {
                ...state,
                isFetching: true
            }
        case ConfigType.FETCH_CONFIG_SUCCESS:
            return {
                ...state,
                configs: action.payload,
                isFetching: false
            }
        case ConfigType.FETCH_CONFIG_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export default configReducer;
