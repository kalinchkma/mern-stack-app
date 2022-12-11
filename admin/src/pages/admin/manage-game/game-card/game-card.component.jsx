import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {styled} from "@mui/material";
import { Link } from 'react-router-dom';

// imports components
import Notification from "../../../../components/notifiation/notification";

// import controllers
import { adminRemoveGameById } from "../../../../controllers/gameController";

// redux state import
import {connect} from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectAuthToken } from "../../../../redux/auth/auth.selector";
import { fetchGamesStartAsync } from "../../../../redux/games/games.action";


// action button
const ActionButton = styled(IconButton)({
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px 0px"
})


const GameCard = ({game, fetchGamesStartAsync, auth}) => {

    /**
      * =============================================================
      * notification state
      * =============================================================
      */
     const [notify, setNotify] = React.useState({
        open: false,
        message: "error",
        severity: 'error'
       });

       const handleNotifyClose = () => {
           setNotify({
               ...notify,
               open: false,
               message: '',
               severity: 'success'
           });
       };

    /**
     * =============================================== 
     *  remove game button
     * */ 
    const removeGameHandler = async (id) => {
       
        try {
            const result = await adminRemoveGameById(id, auth.token);
            if(result.status === 200) {
                
                fetchGamesStartAsync();
            } else {
                setNotify({
                    ...notify,
                    open: true,
                    message: 'Error To Delete games',
                    severity: 'error'
                });
               
            }
        } catch(err) {
            setNotify({
                ...notify,
                open: true,
                message: 'Error To Delete games',
                severity: 'error'
            });
        }
    }
    

  return (
    <Card sx={{ display: 'flex', width: "100%", boxShadow:"0px 0px 3px 0px #3c3c3c"}}>
        {/* game image */}
       <CardMedia
        component="img"
        sx={{ width: 151, flex: "4" }}
        image={game.image}
        alt="Game image"
      />
      <Box sx={{ display: 'flex', width: "100%",flex: "8", flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
            {/* game title */}
          <Typography component="div" variant="h5">
            { game.name ? game.name : "" }
          </Typography>
          {/* game description */}
          {
           game.description.map((text, index) => (
                <Typography key={`${text}${index+Date.now()}`} variant="subtitle1" color="text.secondary" component="div">
                    {text} 
                </Typography>
           )) 
            }
           <Typography variant="subtitle1" color="text.primary" component="div">
                  VideoLink: <a href={game.videoLink} target="_blank" >{game.videoLink}</a> 
           </Typography>
          
          {/* description end */}
        </CardContent>
      </Box>
      {/* action box */}
      <Box sx={{ display: 'flex', alignItems: 'center',flexDirection: "column", pl: 1, pb: 1,pr: 3,justifyContent: "center" }}>
          <ActionButton component={Link} to={`/admin/manage-game/${game._id}`} color='info' variant='outlined'  >
            <BorderColorIcon />
          </ActionButton>
          <ActionButton onClick={() => removeGameHandler(game._id)} color="error" variant='contained'>
            <DeleteForeverIcon />
          </ActionButton>
        </Box>
        {/* Notifiaction pusher */}
        <Notification open={notify.open} message={notify.message} handleClose={handleNotifyClose} severity={notify.severity} />
    </Card>
  );
}

const mapDispatchToProps = dispatch => ({
    fetchGamesStartAsync: () => dispatch(fetchGamesStartAsync())
});

const mapStateTopProps = createStructuredSelector({
  auth: selectAuthToken
})


export default connect(mapStateTopProps, mapDispatchToProps)(GameCard);