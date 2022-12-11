/**
 * manage game page
 */
import * as React from "react";

// import redux state
import {connect} from "react-redux";
import {createStructuredSelector } from "reselect";
import { fetchGamesStartAsync } from "../../../redux/games/games.action";
import { selectGamesCollections, selectGamesIsFetching } from "../../../redux/games/games.select";

// import comonents
import WithPreLoader from "../../../components/preloader/preloader";
import GameList from "./game-card/game-list.component";
import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";


// import styles
import { ManageGameContainer, ManageGameWrapper } from "./manage-game.style";
import { Box } from "@mui/system";


const GameListWithProLoader = WithPreLoader(GameList);


class ManageGame extends React.Component {

    componentDidMount() {
        const { fetchGamesStartAsync } = this.props;
        fetchGamesStartAsync();
    }

    render() {
        // set page title
        document.title = "Manage Game";
        const { games, isGameFetching } = this.props;
        const previousLink = [["Dashboard", "/admin/"]]
        return (
            <ManageGameWrapper>
               
                <PageBreadcrumbs prevLinks={previousLink} currentPage={'manage Games'} />
                
                <ManageGameContainer>
                    <GameListWithProLoader isLoading={isGameFetching} games={games} />
                </ManageGameContainer>
                {
                        games.length === 0 && 
                        <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        >
                           Game list is empty
                        </Box> 
                    }
            </ManageGameWrapper>
        );

    }

}

const mapStateToProps = createStructuredSelector({
    games: selectGamesCollections,
    isGameFetching: selectGamesIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchGamesStartAsync: () => dispatch(fetchGamesStartAsync())
});


export default  connect(mapStateToProps, mapDispatchToProps)(ManageGame);
