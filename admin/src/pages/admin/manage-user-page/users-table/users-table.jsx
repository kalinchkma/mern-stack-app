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
import { adminUserTypeChange, adminRemoveUserById } from "../../../../controllers/userController";
import { connect } from 'react-redux';
import { fetchUsersStartAsync } from "../../../../redux/users/users.action";
import { createStructuredSelector } from 'reselect';
import { selectAuthToken } from "../../../../redux/auth/auth.selector";

const ActionButton = styled(Button)({
   
});


const  UsersDataTable = ({rows, title, dataType, fetchUsersStartAsync, auth}) => {

    // change user type
    const changeUserTypeHandler = async (type, id) => {
       
        try {
            const respose = await adminUserTypeChange(type, id, auth.token);
            if(respose.status === 200) {
                fetchUsersStartAsync();
            } else {
               
            }
        } catch(err) {
           
        }
    }

    // remove user handler
    const removeUserHandler = async (id) => {
        try {
            const respose = await adminRemoveUserById(id, auth.token);
            if(respose.status === 200) {
                fetchUsersStartAsync();
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
                    textAlign: "center",
                    background: "#f1f1f1"
                }}
            >
                    {
                        title
                    }
               
            </Box>
            
            <TableContainer component={Paper} sx={{ minWidth: "100%", maxHeight: "70vh", overflow: "auto" }}>
                <Table  stickyHeader aria-label="sticky table">
                    {/* table head */}
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            {
                            dataType === "buyer" ? 
                                <TableCell align="center">Total Buy</TableCell> :
                                <TableCell align="center">Total Sells</TableCell> 
                               
                            }
                           
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
                            {row.name}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.phone}</TableCell>
                        {
                            row.userType === "buyer" ? 
                            <TableCell align="center">{row.totalBuy}</TableCell>:
                            <TableCell align="center">{row.totalSells}</TableCell>

                        }
                       
                        {/* 
                        ================================================
                            buyer seller admin type change button
                        ================================================
                        */}
                        {
                           row.userType === "buyer" ?  
                           <TableCell align="center">
                            <ActionButton 
                                variant='outlined'
                                color='secondary'
                                onClick={() => changeUserTypeHandler('seller', row._id)}
                            >
                               Make Seller
                            </ActionButton>
                        </TableCell> :
                        <TableCell align="center">
                                <ActionButton
                                    variant='outlined'
                                    color='info'
                                    onClick={() => changeUserTypeHandler('buyer', row._id)}
                                >
                                    Make Buyer
                                </ActionButton>
                        </TableCell>
                        }
                        
                        

                        {/* user block and remove button */}
                        <TableCell align="center">
                            <ActionButton
                                variant='outlined'
                                color='error'
                                onClick={() => changeUserTypeHandler('block', row._id)}
                            >
                                Block
                            </ActionButton>
                        </TableCell>
                        <TableCell align="center">
                            <ActionButton
                                variant='contained'
                                color='error'
                                onClick={() => removeUserHandler(row._id) }
                            >
                                Remove
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
    fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync())
});

const mapStateTopProps = createStructuredSelector({
    auth: selectAuthToken
})


export default connect(mapStateTopProps, mapDispatchToProps)(UsersDataTable)
