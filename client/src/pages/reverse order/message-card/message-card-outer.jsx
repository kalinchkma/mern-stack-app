import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import moment from 'moment';

import Typography from '@mui/material/Typography';

export default function MessageOuter({message}) {
  return (
    <List sx={{ 
        maxWidth: "100%",
        background: "#c1c1c1ad",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: "wrap",
        width:"calc(100% - 100px)",
        marginRight: "auto",
        marginBottom: "30px",
        padding: 0
        }}>
      <ListItem alignItems="flex-start" sx={{
         flexDirection: "column",
         padding: 0

      }}>
          <img alt="" style={{width: "100%", borderRadius: "2px"}} src={message.messageImage} />
          <Typography sx={{
            padding: "5px 20px"
          }} variant='span' >{message.messageContent}</Typography>
          <Typography sx={{
            padding: "5px 20px",
            paddingTop: "0px",
            fontSize: "12px",
            color: "#a39087"
          }}  variant='span' color="sienna">{moment(message.createdAt).format("LLLL")}</Typography>
      </ListItem>
    </List>
  );
}
