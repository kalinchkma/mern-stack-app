import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, List, ListItem} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box } from '@mui/system';

// style component import
import { 
  AnnouncementCardContainer,
  AnnouncementCardAvatar, 
  AnnouncementCardBodyConatiner,
  AnnoucementAvatar,
  AnnouncementCardImage,
  AnnouncementCardBodyContent
} from "./annoucement-card-style";
import { Link } from 'react-router-dom';


const AnnouncementCard = ()  => {

  return (
    <AnnouncementCardContainer >
        <AnnouncementCardAvatar sx={{flex: 1}}>
            <AnnoucementAvatar alt="Gontop" src="/images" />
        </AnnouncementCardAvatar>
        {/* placeholder */}
      
        <AnnouncementCardBodyConatiner>
            <Card sx={{
              boxShadow: 'none',
              background: "#e1e1e1",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              borderTopRightRadius: "15px",
              padding: "2px"
            }} >
                <CardHeader
                  sx={{
                    "& span": {color: "#107c9f",fontWeight: "700"}, 
                    padding: "5px 16px",
                    paddingTop: "16px",
                  }}
                  subheader="Pubg spring events"
                />

                {/* it will show media if annoucement has any */}
                <AnnouncementCardImage
                  component="img"
                  sx={{
                      width: "100%",
                      objectFit: "cover",
                      margin: "0 auto",
                      height: "auto"
                  }}
                  image="/images/pubg.jpg"
                  alt="event image"
                />
              
                  {/* card text content */}
                <AnnouncementCardBodyContent >
                  <Typography paragraph>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. At quasi expedita neque, iusto quod ad repellat nam, quae quas ducimus officiis a magnam quisquam harum quidem itaque. Ea id libero eligendi nobis, rem dolore illum 
                  </Typography>
                  {/* list of content */}
                  <List sx={{
                    "& svg": {color: "#1c5862", marginRight: "10px", },
                    "& p": {fontSize: "14px"}
                
                  }}>
                      <ListItem>
                        <EventNoteIcon />
                        <Typography>item content</Typography>
                      </ListItem>
                      <ListItem>
                        <EventNoteIcon />
                        <Typography>item content</Typography>
                      </ListItem>
                      <ListItem>
                        <EventNoteIcon />
                        <Typography>item content</Typography>
                      </ListItem>
                  </List>
                  {/* link of the announcement */}
                  <Typography 
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& a": {
                      textTransform: "lowercase",
                      fontSize: "14px",
                      color: "#4da5e5",
                      marginRight: "5px"
                    }
                  }}
                  >
                    <a href="https://facebook.com"  rel="noreferrer" target="_blank">#facebook</a>
                    <a href="https://youtube.com" rel="noreferrer" target="_blank">#facebook</a>
                   
                  </Typography>
                </AnnouncementCardBodyContent>

                <CardActions sx={{
                  padding: "8px 16px",
                  display: "flex",
                  justifyContent: "space-between"
                }} >
                  <Box>
                    <Button>intersted</Button>
                    <Button>not intersted</Button>
                  </Box>
                  <Typography variant='body2' color="text.secondary" >Novembor 10, 2022</Typography>
                </CardActions>
            </Card> 
        </AnnouncementCardBodyConatiner>
        
    </AnnouncementCardContainer>
  );
}

export default AnnouncementCard
