import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {List, ListItem} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box } from '@mui/system';
import moment from 'moment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

// style component import
import { 
  AnnouncementCardContainer,
  AnnouncementCardAvatar, 
  AnnouncementCardBodyConatiner,
  AnnoucementAvatar,
  AnnouncementCardImage,
  AnnouncementCardBodyContent
} from "./annoucement-card-style";



export default function AnnouncementCard({announcement}) {



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
                  subheader={announcement.title}
                />

                {/* it will show media if annoucement has any */}
                {
                  announcement.image &&
                  <AnnouncementCardImage
                    component="img"
                    sx={{
                        width: "100%",
                        objectFit: "cover",
                        margin: "0 auto",
                        height: "auto"
                    }}
                    image={announcement.image}
                    alt="event image"
                  />
                }
              
              
                  {/* card text content */}
                <AnnouncementCardBodyContent >
                  {
                    announcement.text && 
                    <Typography paragraph>
                      {announcement.text}
                    </Typography>
                  }
                  {/* list of content */}

                 
                  {
                    announcement.list && announcement.list.note &&
                    <List sx={{
                      "& svg": {color: "#1c5862", marginRight: "10px", },
                      "& p": {fontSize: "14px"}
                  
                    }}>
                      
                      {
                        announcement.list && announcement.list.note &&
                        announcement.list.note.map((note, index) => (
                          <ListItem key={index}>
                            <EventNoteIcon />
                            <Typography>{note}</Typography>
                        </ListItem>
                        ))
                      }
                    </List>
                  }
                  {/* link of the announcement */}
                  {
                    announcement.list && announcement.list.link &&
                   

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
                      { announcement.list.link.map((link, index)=>(
                        <a key={index} href={link}  rel="noreferrer" target="_blank">#{link}</a>
                      ))
                      }
                    </Typography>
                    
                  }
                </AnnouncementCardBodyContent>

              

                <CardActions sx={{
                  padding: "8px 16px",
                  display: "flex",
                  justifyContent: "space-between"
                }} >
              
                  <Typography variant='body2' color="text.secondary" >
                    {moment(announcement.createdAt).format('LLL')}
                  </Typography>
                </CardActions>
            </Card> 
        </AnnouncementCardBodyConatiner>
        
    </AnnouncementCardContainer>
  );
}
