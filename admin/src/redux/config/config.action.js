/**
 * announcement action
 */

 import config from "../../config";
 import ConfigType from "./config.type";

 export const fetchConfigStart = () => ({
    type: ConfigType.FETCH_CONFIG_START
 });

 export const fetchConfigSuccess = (configs) => ({
    type: ConfigType.FETCH_CONFIG_SUCCESS,
    payload: configs
 });


 export const fetchConfigError = (message) => ({
    type: ConfigType.FETCH_CONFIG_ERROR,
    payload: message
 });


 export const fetchConfigStartAsync = () => {
    return async (dispatch) => {
        dispatch(fetchConfigStart());
        try {
            // @TODO change api url
            const res = await fetch(`${config.API_DOMAIN}/config`, {
                method: "GET"
            });
            const result = await res.json();
            if(res.status === 200) {
                dispatch(fetchConfigSuccess(result.success.config));
            } else {
                dispatch(fetchConfigError(res.errors.msg));
            }
        } catch(err) {
            dispatch(fetchConfigError(err));
        }
    }
 }