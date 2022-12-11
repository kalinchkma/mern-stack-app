/**
 * game component
 */
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GameHeaderBox, GameHeaderContainer } from "./game-header.style";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";


const GameHeader = ({title, pageLink, ...props}) => {
    const navigate = useNavigate()

    return (
        <GameHeaderContainer {...props}>
            <GameHeaderBox>
                {
                    pageLink ?
                <IconButton component={Link} to={pageLink}>
                    <ArrowBackIcon sx={{
                        color: "#fff"
                    }} />
                </IconButton> :
                <IconButton component={Link} onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{
                        color: "#fff"
                    }} />
                </IconButton> 

                }
                <Typography sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    textTransform: "capitalize"
                }}>
                    {title}
                </Typography>
            </GameHeaderBox>
        </GameHeaderContainer>
    )
}


export default GameHeader;
