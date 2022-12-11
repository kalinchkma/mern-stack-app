/**
 * manage user page
 */

import * as React from 'react';

import { useNavigate } from 'react-router-dom';

// redux state import
import { connect } from "react-redux";
import { setToken } from "../../redux/auth/auth.action";
import { fetchGamesSuccess } from "../../redux/games/games.action";
import { fetchCollectionSuccess } from "../../redux/shop/shop.action";
import { fetchUsersSuccess } from "../../redux/users/users.action";
 
 
const Logout  = ({setToken, fetchGamesSuccess, fetchCollectionSuccess, fetchUsersSuccess}) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        setToken(null);
        fetchGamesSuccess(null);
        fetchCollectionSuccess(null);
        fetchUsersSuccess(null);
        navigate("/");
    }, []);
         
}

const mapDispatchToProps = dispatch => ({
    setToken: (token) => dispatch(setToken(token)),
    fetchGamesSuccess: (games) => dispatch(fetchGamesSuccess(games)),
    fetchCollectionSuccess: (collections) => dispatch(fetchCollectionSuccess(collections)),
    fetchUsersSuccess: (users) => dispatch(fetchUsersSuccess(users))
 });
 
export default connect(null, mapDispatchToProps)(Logout)