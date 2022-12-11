/**
 * list item
 */
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";


const SideListItem = ({listIcon,listText, open,...props}) => {
    return (
        <ListItem disablePadding sx={{ display: 'block',color: "#fff",fontWeight: "700" }} {...props}  >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: "#fff"
                  }}
                >
                  {listIcon}
                </ListItemIcon>
                <ListItemText primary={listText} sx={{ opacity: open ? 1 : 0 , "& span":{textTransform: "lowercase"}}} />
              </ListItemButton>
            </ListItem>
    )
}

export default SideListItem;
