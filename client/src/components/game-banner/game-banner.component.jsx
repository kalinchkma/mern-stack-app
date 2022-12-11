/**
 * Game banner
 */
import { GameBannerContainer } from "./game-banner.styles";

const GameBanner = ({img}) => {
    return (
        <GameBannerContainer sx={{
            background: `url(${img})`
        }}>

        </GameBannerContainer>
    )
}

export default GameBanner;
