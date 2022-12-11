/**
 * game list components
 */

// imports styles
import {GameListContainer, GameListTitle} from "./game-list.styles";

// imports components
import GameCard from "../game-card/game-card.component";
import { Grid } from "@mui/material";

// redux state imports
import {connect} from "react-redux";
import { selectGamesCollections } from "../../redux/games/games.select";
import { createStructuredSelector } from "reselect";
import { Box } from "@mui/system";

const GameList = ({games}) => {
    
    return (
        <GameListContainer>
            <GameListTitle>available games</GameListTitle>

            <Grid container spacing={1}>
                {/* list grid */}
                {
                    games &&
                    games.map(game => (
                        <Grid key={game._id} item xs={4}>
                            <GameCard img={game.image} title={game.name} subtitle={game.gener} to={`/game/product/${game._id}`} />
                        </Grid>
                    ))
                }
                {
                    games && games.length <= 0 &&
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px 0px"
                    }}>No game!!</Box>
                }
               
            </Grid>

        </GameListContainer>
    )
}


const mapStateToProps = createStructuredSelector({
    games: selectGamesCollections
});


export default connect(mapStateToProps)(GameList);

