import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from 'react-router-dom';
import { Divider } from '@mui/material';


// [['name', 'link'], ['name', 'link']]

export default function PageBreadcrumbs({prevLinks, currentPage}) {
  return (
    <div role="presentation" style={{paddingTop: "5px", paddingBottom: "30px"}}>
      <Breadcrumbs aria-label="breadcrumb">

        {
            prevLinks.map(([name, link]) => (
                <Link style={{ textTransform: "capitalize", color: "rgb(29 51 100)", textTransform: "uppercase" }} key={link} to={link} underline="hover" color="inherit" href="/">
                    {name}
                </Link>
            ))
        }
        <Typography color="text.primary" sx={{
          color: "#35d9a5",
          textTransform: "uppercase"
        }}>{currentPage}</Typography>
      </Breadcrumbs>

    </div>
  );
}
