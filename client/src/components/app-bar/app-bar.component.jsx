import * as React from 'react';
import { Badge, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


/**
 * imports styles
 */
import { AppBarIcon, AppToolbar, AppBarContainer, AppBarItemGrid, AppBarGrid} from "./app-bar.styles";


import {Link} from "react-router-dom";

// imports state 
import { connect } from "react-redux";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { createStructuredSelector } from 'reselect';




const MainAppBar = ({auth, notification}) => {


  


  return (
    <div>
  {/*
  ====================================================
  ==== main app bar 
  ====================================================
  */}
      <AppBarContainer position="fixed" color="primary" >

      <AppBarGrid  container spacing={0}  >

        <Grid item xs={12}>
            <AppToolbar>

              <AppBarItemGrid container spacing={2} columns={16} >

                       {/* Home tab */}
                   <Grid item xs={4}>
                      <AppBarIcon LinkComponent={Link} to="/" color="inherit" aria-label="open drawer">
                          <HomeIcon sx={{fontSize: "30px"}} />
                          <span>home</span>
                      </AppBarIcon>
                  </Grid>
                  {/* history */}
                  <Grid item xs={4}>
                      {
                        notification &&
                        notification.order ?
                        <Badge color="warning" variant="dot" >
                          <AppBarIcon LinkComponent={Link} to="/history" color="inherit" aria-label="open drawer">
                              <ShoppingCartIcon sx={{fontSize: "30px"}} />
                              {
                                (auth !== null && (auth.userType === "admin" || auth.userType === "seller")) ?
                                <span>Order</span>:
                                <span>My Order</span>
                              }
                          </AppBarIcon>
                        </Badge> :
                        <AppBarIcon LinkComponent={Link} to="/history" color="inherit" aria-label="open drawer">
                              <ShoppingCartIcon sx={{fontSize: "30px"}} />
                              {
                                (auth !== null && (auth.userType === "admin" || auth.userType === "seller")) ?
                                <span>Order</span>:
                                <span>My Order</span>
                              }
                        </AppBarIcon>
                      }
                  </Grid>

                {/* announcemnet */}
                  <Grid item xs={4}>
                      <AppBarIcon LinkComponent={Link} to="/announcement" color="inherit" aria-label="open drawer">
                          <CampaignIcon sx={{fontSize: "30px"}} />
                          <span>announcement</span>
                      </AppBarIcon>
                  </Grid>
                  {/* profile */}
                  <Grid item xs={4}>
                      <AppBarIcon LinkComponent={Link} to="/profile" color="inherit" aria-label="open drawer">
                          <AccountCircleIcon sx={{fontSize: "30px"}} />
                          <span>profile</span>
                      </AppBarIcon>
                  </Grid>
              </AppBarItemGrid>
            </AppToolbar>
          </Grid>
        </AppBarGrid>

      </AppBarContainer>

    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  auth: selectAuthToken
})

export default connect(mapStateToProps)(MainAppBar);