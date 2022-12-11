/**
 * edit page entry
 */
import * as React from "react";
import {useParams} from "react-router-dom";


// utils imports
import findById from "../../../utils/findById";

// imports components
import EditGamePage from "./edit-game-page.component";
import WithPreLoader from "../../../components/preloader/preloader";

// redux state imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectGamesIsFetching, selectGamesCollections } from "../../../redux/games/games.select";
import { fetchGamesStartAsync } from "../../../redux/games/games.action";

// construct component
const EditGamePageWithPreLoader = WithPreLoader(EditGamePage);


const EditGamePageEntry = ({ games, isGameFetching }) =>  {
        const params = useParams();

        // requested game id
        const id = params.id;
        const game = findById(id, games);
        
        return (
            <div>
                <EditGamePageWithPreLoader game={game} isLoading={isGameFetching} />
            </div>
        );
}

const mapStateToProps = createStructuredSelector({
    games: selectGamesCollections,
    isGameFetching: selectGamesIsFetching
});




export default connect(mapStateToProps)(EditGamePageEntry);

