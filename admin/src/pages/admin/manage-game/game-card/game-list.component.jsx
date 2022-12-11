import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


// import component
import GameCard from './game-card.component';


export default function GameList({games}) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {games.map((game) => (
        <ListItem
          key={game._id}
          disableGutters
        >
          <GameCard game={game} />
        </ListItem>
      ))}
    </List>
  );
}
