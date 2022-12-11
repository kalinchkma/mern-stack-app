/**
 * Admin entry page
 */
import * as React from "react";
import { Routes, Route } from "react-router-dom";

// expternal component imports
import WithPreLoader from "../../components/preloader/preloader";
import MainAdminPage from "./main-page/main-page.component";

// redux connector
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";

// redux state import 
import { fetchCollectionStartAsync } from "../../redux/shop/shop.action";
import { fetchUsersStartAsync } from "../../redux/users/users.action";
import { fetchGamesStartAsync } from "../../redux/games/games.action";
import { selectCollections, selectShopIsFetching, selectShopIsLoaded } from "../../redux/shop/shop.selector";
import { selectGamesCollections, selectGamesIsFetching, selectGameIsLoaded } from "../../redux/games/games.select";
import { selectUsersList, selectUsersIsFetching, selectUsersIsLoaded } from "../../redux/users/users.selector";
import { selectAuthToken } from "../../redux/auth/auth.selector";

// hook imports
import {useNavigate} from "react-router-dom";


// peroloading admin
const MainAdminPageWithProLoader = WithPreLoader(MainAdminPage);



function withHook(Component) {
    function ComponentWithRouter({...props}) {
      let navigate = useNavigate();
      return <Component {...props}  navigate={navigate} />
    }

    const mapStateTopProps = createStructuredSelector({
        collections: selectCollections,
        games: selectGamesCollections,
        users: selectUsersList,
        isUserFetching: selectUsersIsFetching,
        isGamesFetching: selectGamesIsFetching,
        isShopIsFetching: selectShopIsFetching,
        isUserLoaded: selectUsersIsLoaded,
        isGamesLoaded: selectGameIsLoaded,
        isShopIsLoaded: selectShopIsLoaded,
        auth: selectAuthToken
    });
    
    const mapDispatchTopProps = dispatch => ({
        fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
        fetchGamesStartAsync: () => dispatch(fetchGamesStartAsync()),
        fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync())
    })
    
    return connect(mapStateTopProps, mapDispatchTopProps)(ComponentWithRouter);
}


class AdminPage extends React.Component {
    
    componentDidMount() {
        // fetching all data before admin dashboard loaded
        const { fetchCollectionStartAsync, fetchGamesStartAsync, fetchUsersStartAsync, auth, navigate } = this.props;
   
        if(auth) {
            fetchCollectionStartAsync();
            fetchGamesStartAsync();
            fetchUsersStartAsync();
        } else {
            navigate("/errors");
        }
  
    }
    
    render() {
       const { isGamesLoaded, isShopIsLoaded, isUserLoaded } = this.props;

       return (<>  
            <Routes>
                <Route path="/*" element={
                    <MainAdminPageWithProLoader isLoading={!(isGamesLoaded && isShopIsLoaded && isUserLoaded)} />
                } />
            </Routes>
            </>)
    }
}







// export default  connect(mapStateTopProps, mapDispatchTopProps)(AdminPage);
export default  withHook(AdminPage);