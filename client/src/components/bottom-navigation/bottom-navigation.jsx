import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from '@mui/system';
export default function AppNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
        sx={{
            position: 'fixed',
             bottom: 0,
             left: 0,
             right: 0,
             width: "100%"
        }}
    >


        <BottomNavigation sx={{ boxShadow: "0px -2px 10px 0px #62606057", width: "480px",margin: "0 auto" }} value={value} onChange={handleChange}>
        <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
        />
        <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOnIcon />}
        />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
        </BottomNavigation> 
    </Box>
  );
}
