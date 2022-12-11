/**
 * Home page component
 */
import * as React from "react";


// component imports
import HomePageBanner from "../../components/home-banner-slider/home-banner-slider.component";
import GameList from "../../components/game-list/game-list.component";
import WelcomeBanner from "../../components/welcome-banner/welcome-banner.component";
import  WithPreLoader from "../../components/preloader/preloader";

// import styles
import {HomePageContainer} from "./home-page.styles";

// import redux state
import {connect} from "react-redux";
import { fetchGamesStartAsync } from "../../redux/games/games.action";
import { selectGamesIsFetching } from "../../redux/games/games.select";
import { fetchCollectionStartAsync } from "../../redux/shop/shop.action";
import { fetchSellerStartAsync } from "../../redux/seller/seller.action";
import { createStructuredSelector } from "reselect";
import { fetchConfigStartAsync } from "../../redux/config/config.action";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { setToken } from "../../redux/auth/auth.action";

import { verifyLogin } from "../../controllers/userController";

const GameListWithProLoader = WithPreLoader(GameList);


class HomePage extends React.Component {

    loginVerify = async (auth, setToken) => {
      try {

        const reqObject = {
          auth: auth,
          token: auth.token
        }
        // verifyLogin
        const res = await verifyLogin(reqObject);
        console.log(res);
        if(res.status === 200) {
          setToken(res.success.auth_user);
        } else {
          setToken(null);
        }
      } catch(err) {
        console.log(err);
      }
      
    }
    componentDidMount() {
      const { fetchGamesStartAsync, fetchSellerStartAsync, fetchCollectionStartAsync, fetchConfigStartAsync, auth, setToken } = this.props;
      fetchGamesStartAsync();
      fetchCollectionStartAsync();
      fetchSellerStartAsync();
      fetchConfigStartAsync();
      if(auth) {
        this.loginVerify(auth, setToken);
      }
    }


    // render view
    render() {
      const {isGamesFetching } = this.props;
        return (
           <HomePageContainer>
            {/* banner slider */}
                <HomePageBanner />

                {/* welcome banner */}
                <WelcomeBanner />

                {/* available game list */}
                <GameListWithProLoader isLoading={isGamesFetching} />
              
              {/* place holder */}
              <div style={{
                height: "20px"
              }} >

              </div>
           </HomePageContainer>
        )
    }
}


const mapStateToProps = createStructuredSelector({
  isGamesFetching: selectGamesIsFetching,
  auth: selectAuthToken
});

const mapDispatchToProps = dispatch => ({
  fetchGamesStartAsync: () => dispatch(fetchGamesStartAsync()),
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
  fetchSellerStartAsync: () => dispatch(fetchSellerStartAsync()),
  fetchConfigStartAsync: () => dispatch(fetchConfigStartAsync()),
  setToken: (token) => dispatch(setToken(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
