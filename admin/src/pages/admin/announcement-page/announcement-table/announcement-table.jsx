/**
 * User table show
 */

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, styled } from '@mui/material';

// user controller functions

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAuthToken } from "../../../../redux/auth/auth.selector";
import { fetchAnnouncementStartAsync } from "../../../../redux/announcement/announcement.action";
import { Link } from 'react-router-dom';

// import utils
import { deleteAnnouncement } from "../../../../controllers/annuncement";


const ActionButton = styled(Button)({
   
});


const  AnnouncementDataTable = ({rows, title, dataType, auth, fetchAnnouncementStartAsync}) => {



    // remove user handler
    const removeAnnouncementHandler = async (id, token) => {
        try {
            const res = await deleteAnnouncement(id, token);
          
            if(res.status === 200) {
                fetchAnnouncementStartAsync();
            } else {
               
            }
        } catch(err) {
           
        }
    } 


    return  (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "50px"
            }}
        >   
        {/* 
            data header
        */}
            <Box 
                sx={{
                    color: "#666",
                    fontSize: "30px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    width: "100%",
                    background: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0px 10px"
                }}
            >
                    {
                        title
                    }
                    <Button variant='contained' color="success" component={Link} to="/admin/announcement/create">Create Announcement</Button>
               
            </Box>
            
            <TableContainer component={Paper} sx={{ minWidth: "100%", maxHeight: "70vh", overflow: "auto" }}>
                <Table  stickyHeader aria-label="sticky table">
                    {/* table head */}
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Title</TableCell>
                            <TableCell align="center">Interested</TableCell>
                            <TableCell align="center">Notinterested</TableCell>
                            <TableCell align="center" colSpan={5} >Action</TableCell>
                        
                        </TableRow>
                    </TableHead>
                    {/* table body */}
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                        <TableCell align='left'>
                            {row.title}
                        </TableCell>
                        <TableCell align="center">{row.interestedList.length}</TableCell>
                        <TableCell align="center">{row.notInterestedList.length}</TableCell>
                        
                        {/* <TableCell align="center">
                            <ActionButton 
                                variant='outlined'
                                color='secondary'
                                component={Link}
                                to={`/admin/announcement/edit/${row._id}`}
                            >
                               Edit
                            </ActionButton>
                        </TableCell>  */}
                        {/* not implemented yet */}
                        {/* <TableCell align="center">
                                <ActionButton
                                    variant='outlined'
                                    color='info'
                                    component={Link}
                                >
                                    View
                                </ActionButton>
                        </TableCell> */}
                        
                        {/* user block and remove button */}
                        <TableCell align="center">
                            <ActionButton
                                variant='outlined'
                                color='error'
                                onClick={() => removeAnnouncementHandler(row._id, auth.token)}
                            >
                               Delete
                            </ActionButton>
                        </TableCell>
                       
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
    )
   
}

const mapDispatchToProps = dispatch => ({
    fetchAnnouncementStartAsync: () => dispatch(fetchAnnouncementStartAsync())
});

const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken
})


export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementDataTable)
