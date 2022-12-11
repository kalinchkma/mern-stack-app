import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

// react router dom import 
import { Routes, Route, Link } from "react-router-dom";



// style import 
import { AppBar, Drawer, DrawerHeader } from "./main-page.styles";
import SideListItem from "./list-item";

// external page component import
import Dashboard from '../dashboard/dashboard.component';
import AddUserPage from '../add-user-page/add-user-page.component';
import ManageUserPage from '../manage-user-page/manage-user-page';
import AddGamePage from '../add-game-page/add-game-page.component';
import ManageGame from '../manage-game/manage-game.page';
import EditGamePageEntry from '../edit-game-page/edit-game-entry.page';
import AddProductPage from '../add-product-page/add-product-page.component';
import ManageProduct from "../manage-product-page/manage-product-page";
import BlackListUserPage from '../black-list-user-page/black-list-user-page';
import AnnouncementPage from '../announcement-page/announcement-page.component';
import CreateAnnouncementPage from '../announcement-page/create-announcement/create-announcement';
import EditAnnouncementPage from "../announcement-page/edit-announcement/edit-announcement";
import ConfigPage from '../config-page/config-page.component';
import ManageSelles from '../manage-selles/manage-selles-page';

// import logout hook
import Logout from '../logout.hook';



// side menu object
const user_menu = [ 
  ["Dashboard", DashboardTwoToneIcon, ""], 
  ["Add user", GroupAddTwoToneIcon, "add-user"], 
  ["Manage User", ManageAccountsIcon, "manage-user"],
  ["ADD Game", SportsEsportsIcon, "add-game"], 
  ["Manage Game", SettingsIcon, "manage-game"],
  ["ADD Product", LocalGroceryStoreIcon, "add-product"],
  ["Manage Product", ShoppingBasketIcon, "manage-product"],
];

// admin action menu
const action_menu = [
  ["Announcement", CampaignIcon, "announcement"],
  ["Black List", PlaylistRemoveIcon, "black-list"],
  ["Config", SettingsInputComponentIcon, "config"],
  // ["Manage Selles", ProductionQuantityLimitsIcon, "manage-selles"],
  ["Logout", ExitToAppIcon, "logout"]
]



// main dash board drawer component
const MainAdminPage = () => {
  // set document type

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    {/* app bar start */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: "#333",
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{color: "#333"}}>
            GonTop Admin
          </Typography>
        </Toolbar>
      </AppBar>
    {/* app bar end */}
    {/* side menu */}
      <Drawer variant="permanent" open={open} sx={{"& div": { background: "#131b2cf5" }}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#fff" }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* individual lists */}
        <List>
          {user_menu.map(([text, Licon, path])=> (
            <SideListItem key={text} to={`/admin/${path}`} component={Link} listIcon={<Licon />} listText={text} open={open} />
          ))}
        </List>
        <Divider />
        <List>
          {action_menu.map(([text, Licon, path]) => (
            <SideListItem key={text} to={`/admin/${path}`} component={Link} listIcon={<Licon />} listText={text} open={open} />
          ))}
        </List>
      </Drawer>

      {/* side menu end */}
      {/* main content box */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} >
        {/* this is for place holder */}
        <DrawerHeader />
        {/* --------main content start------- */}
          <Routes>
              <Route path="/add-user" element={<AddUserPage />} />
              <Route path="/manage-user" element={<ManageUserPage />} />
              <Route path='/add-game' element={<AddGamePage />} />
              <Route path='/manage-game' element={<ManageGame />} />
              {/* <Route path='/manage-selles' element={<ManageSelles />} /> */}
              <Route path='/manage-game/:id' element={<EditGamePageEntry />} />
              <Route path='/add-product' element={<AddProductPage />} />
              <Route path='/manage-product' element={<ManageProduct />} />
              <Route path='/black-list' element={<BlackListUserPage />} />
              <Route path='/announcement' element={<AnnouncementPage />} />
              <Route path='/announcement/create' element={<CreateAnnouncementPage />} />
              <Route path='/announcement/edit/:id' element={<EditAnnouncementPage />} />
              <Route path='/config' element={<ConfigPage />}/>
              <Route path='/logout' element={<Logout />}/>
              <Route path="/*" element={<Dashboard />} />
          </Routes>
      </Box>
      {/* main content box end */}
    </Box>
  );
}


export default MainAdminPage;
