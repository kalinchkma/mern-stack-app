/**
 * Dashbord page
 */
import * as React from "react";

import {
    Box, Button, Grid, Typography
} from "@mui/material"
import { Link } from "react-router-dom";

// import styled components
import * as styles from "./dashboard.styles";

// state imports
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUsersList } from "../../../redux/users/users.selector";
import { selectGamesCollections } from "../../../redux/games/games.select";
import { selectCollections } from "../../../redux/shop/shop.selector";
import { selectAllAnnouncement } from "../../../redux/announcement/announcement.select";
import { fetchAnnouncementStartAsync } from "../../../redux/announcement/announcement.action";
import { fetchGamesStartAsync } from "../../../redux/games/games.action";
import { fetchCollectionStartAsync } from "../../../redux/shop/shop.action";
import { fetchUsersStartAsync } from "../../../redux/users/users.action";

const Dashboard = ({ games, 
    announcements,
    users, 
    products,
    fetchUsersStartAsync,
    fetchCollectionStartAsync,
    fetchGamesStartAsync,
    fetchAnnouncementStartAsync
     }) => {
    document.title = "Dashboard";

    React.useEffect(() => {
        fetchUsersStartAsync();
        fetchCollectionStartAsync();
        fetchGamesStartAsync();
        fetchAnnouncementStartAsync()
    },[]);
    
   
    return (
        <styles.DashboardContainer>
            {/* counter grid */}
            <Grid container spacing={3}>
                {/*
                ...................................................
                    user counter 
                ......................................................
                */}
                <Grid item md={4} xs={12} >
                    <styles.CounterBox  sx={{background: "#75bcfb"}}>
                        {/* header */}
                        <Typography sx={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#fff"
                        }}>
                            Total User
                        </Typography>
                        {/* counter */}
                        {
                            users && 
                            <Typography sx={{
                                fontSize: "1.5rem",
                                fontWeight: "500",
                                color: "#fff",
                                marginTop: "0.8rem"
                            }}> 
                               {
                                users.length
                               }
                            </Typography>
                        }
                       
                        {/* action */}
                        <Box sx={{
                            marginTop: "1rem"
                        }}>
                            <Button variant="contained" color="error"
                            component={Link}
                            to="/admin/manage-user"
                            >manage</Button>
                            <Button variant="contained" sx={{
                                marginLeft: "10px",
                            }} color="warning"
                            component={Link}
                            to="/admin/add-user"
                            >add</Button>
                        </Box>
                    </styles.CounterBox>
                </Grid>
                {/* 
                ...........................................
                user counter end 
                ...........................................
                */}
                {/*
                ...................................................
                    game counter 
                ......................................................
                */}
                <Grid item md={4} xs={12} >
                    <styles.CounterBox  sx={{background: "#6459b5"}}>
                        {/* header */}
                        <Typography sx={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#fff"
                        }}>
                            Total Games
                        </Typography>
                        {/* counter */}
                        {
                            games &&
                            <Typography sx={{
                                fontSize: "1.5rem",
                                fontWeight: "500",
                                color: "#fff",
                                marginTop: "0.8rem"
                            }}> 
                                {
                                    games.length
                                }
                            </Typography>
                        }
                        
                        {/* action */}
                        <Box sx={{
                            marginTop: "1rem"
                        }}>
                            <Button variant="contained" color="secondary" 
                            component={Link}
                            to="/admin/manage-game"
                            >manage</Button>
                            <Button variant="contained" sx={{
                                marginLeft: "10px",
                            }} color="success"
                            component={Link}
                            to="/admin/add-game"
                            >add</Button>
                        </Box>
                    </styles.CounterBox>
                </Grid>
                {/* 
                ...........................................
                game counter end 
                ...........................................
                */}
                {/*
                ...................................................
                    product counter 
                ......................................................
                */}
                <Grid item md={4} xs={12} >
                    <styles.CounterBox  sx={{background: "#a5a5a5"}}>
                        {/* header */}
                        <Typography sx={{
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#fff"
                        }}>
                            Total Products
                        </Typography>
                        {/* counter */}
                        {
                            products && 
                            <Typography sx={{
                                fontSize: "1.5rem",
                                fontWeight: "500",
                                color: "#fff",
                                marginTop: "0.8rem"
                            }}> 
                                {
                                    products.length
                                }
                            </Typography>
                        }
                        
                        {/* action */}
                        <Box sx={{
                            marginTop: "1rem"
                        }}>
                            <Button variant="contained" color="secondary"
                            component={Link}
                            to="/admin/manage-product"
                            >manage</Button>
                            <Button variant="contained" sx={{
                                marginLeft: "10px",
                            }} color="success"
                            component={Link}
                            to="/admin/add-product"
                            >add</Button>
                        </Box>
                    </styles.CounterBox>
                </Grid>
                {/* 
                ...........................................
                products counter end 
                ...........................................
                */}
                {/*
                ...................................................
                    announcement counter 
                ......................................................
                */}
                <Grid item md={6} sm={12} xs={12}>
                    <styles.CounterBox  sx={{background: "#ff7c7c"}}>
                        {/* header */}
                        <Typography sx={{
                            fontSize: "2rem",
                            fontWeight: "700",
                            color: "#fff"
                        }}>
                            Total Announcement
                        </Typography>
                        {/* counter */}
                        {
                            announcements &&
                            <Typography sx={{
                                fontSize: "1.5rem",
                                fontWeight: "500",
                                color: "#fff",
                                marginTop: "0.8rem"
                            }}> 
                                {
                                    announcements.length
                                }
                            </Typography>
                        }
                        {/* action */}
                        <Box sx={{
                            marginTop: "1rem"
                        }}>
                            <Button variant="contained" component={Link}
                            to="/admin/announcement" color="secondary" >manage</Button>
                            <Button variant="contained" sx={{
                                marginLeft: "10px",
                            }} color="success"
                            component={Link}
                            to="/admin/announcement/create"
                            >add</Button>
                        </Box>
                    </styles.CounterBox>
                </Grid>
                {/* 
                ...........................................
                Announcement counter end 
                ...........................................
                */}
                
                
                
            </Grid>
            {/* counter grid end */}
        </styles.DashboardContainer>
    );
}

const mapStateToProps = createStructuredSelector({
    users: selectUsersList,
    games: selectGamesCollections,
    announcements: selectAllAnnouncement,
    products: selectCollections
});

const mapDispatchToProps = dispatch => ({
    fetchAnnouncementStartAsync: () => dispatch(fetchAnnouncementStartAsync()),
    fetchGamesStartAsync: () => dispatch(fetchGamesStartAsync()),
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
    fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync())
})


export default  connect(mapStateToProps,mapDispatchToProps)(Dashboard);

