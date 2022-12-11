/**
 * manage user page
 */

import * as React from 'react';


// import components
import UsersDataTable from './users-table/users-table';
import WithPreLoader from '../../../components/preloader/preloader';
import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";

// import styles
import * as styles from "./black-list-user.style";

// redux state import
import {connect} from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsersList, selectUsersIsFetching } from "../../../redux/users/users.selector";
import { fetchUsersStartAsync } from "../../../redux/users/users.action";

// utils import
import { findBuyer, findSeller, findBlockedUser } from "../../../utils/userUtils";
import { Box } from '@mui/material';



const UsersDataTableWithProLoader = WithPreLoader(UsersDataTable);


class BlackListUserPage extends React.Component {

    componentDidMount() {
        const { fetchUsersStartAsync } = this.props;
        fetchUsersStartAsync();
    }

    render() {
        // setting document name
        document.title = "Black List";
        const { isUsersFetching, users } = this.props;
       
        const blockedUser = findBlockedUser(users);

        console.log("blocked user is ", blockedUser);

        const previousLink = [["Dashboard", "/admin/"]]

        return (
            <styles.BlackListUserContainer>
                   <PageBreadcrumbs prevLinks={previousLink} currentPage={'black list users'} />
                    {
                        blockedUser.length > 0  &&
                        <UsersDataTableWithProLoader isLoading={isUsersFetching} rows={blockedUser} title={'Blocked Users'} dataType=""/> 
                        
                    }
                   
                    {
                        blockedUser.length === 0 && 
                        <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        >
                            back list is empty
                        </Box> 
                    }
            </styles.BlackListUserContainer>
        );
    }
   
}

const mapStateToProps = createStructuredSelector({
    users: selectUsersList,
    isUsersFetching: selectUsersIsFetching
});

const mapDispatchToProps = dispatch => ({
    fetchUsersStartAsync: () => dispatch(fetchUsersStartAsync())
})


export default connect(mapStateToProps, mapDispatchToProps)(BlackListUserPage)

