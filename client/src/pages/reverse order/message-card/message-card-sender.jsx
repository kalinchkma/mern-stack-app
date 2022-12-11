import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import moment from 'moment';

import Typography from '@mui/material/Typography';

export default function MessageSender({message}) {
  // console.log(message.messageImage);
  return (
    <List sx={{ 
        maxWidth: "100%",
        background: "#dfdfdf5e",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: "wrap",
        width:"calc(100% - 100px)",
        marginLeft: "auto",
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
