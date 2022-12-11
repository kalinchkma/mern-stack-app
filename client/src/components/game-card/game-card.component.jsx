import * as React from 'react';
import { CardActionArea } from '@mui/material';

// imports styles
import { GameCardContainer, GameCardMedia,GameCardContent,GameCardTitle,GameCardSubTitle } from "./game-card.styles";
import { Link } from 'react-router-dom';



export default function GameCard({img, title, subtitle, ...props}) {
  return (
    <GameCardContainer component={Link} {...props} >
      <CardActionArea>

        <GameCardMedia
          component="img"
          image={img}
          alt="pubg"
        />

        <GameCardContent >
          <GameCardTitle gutterBottom variant="h5" component="div">
           {title}
          </GameCardTitle>
        </GameCardContent>

      </CardActionArea>

    </GameCardContainer>
  );
}
