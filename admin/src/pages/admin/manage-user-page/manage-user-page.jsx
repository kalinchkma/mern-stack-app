/**
 * manage user page
 */

import * as React from 'react';


// import components
import UsersDataTable from './users-table/users-table';
import WithPreLoader from '../../../components/preloader/preloader';
import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";

// import styles
import * as styles from "./manage-user.style";

// redux state import
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsersList, selectUsersIsFetching } from "../../../redux/users/users.selector";
import { fetchUsersStartAsync } from "../../../redux/users/users.action";

// utils import
import { findBuyer, findSeller } from "../../../utils/userUtils";
import { Box } from '@mui/material';



const UsersDataTableWithProLoader = WithPreLoader(UsersDataTable);


class ManageUserPage extends React.Component {

    componentDidMount() {
        const { fetchUsersStartAsync } = this.props;
        fetchUsersStartAsync();
    }

    render() {
        // setting document name
        document.title = "Manage user";
        const { isUsersFetching, users } = this.props;
        const buyers = findBuyer(users);
        const sellers = findSeller(users);

        const previousLink = [["Dashboard", "/admin/"]]

        return (
            <styles.ManageUsersContainer>
                   <PageBreadcrumbs prevLinks={previousLink} currentPage={'manage users'} />

                    {
                        sellers.length > 0 ?
                        <UsersDataTableWithProLoader isLoading={isUsersFetching} rows={sellers} title={'Manage seller'} dataType="seller"/>
                        : " "
                    }

                    {
                        buyers.length > 0 ? 
                        <UsersDataTableWithProLoader isLoading={isUsersFetching} rows={buyers} title={'Manage buyer'} dataType="buyer"/> 
                        : ""
                    }
                 
                    {
                        (buyers.length === 0 && sellers.length === 0) ? 
                        <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        >
                            No Buyer and seller found!!
                        </Box> : ""
                    }
            </styles.ManageUsersContainer>
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


export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage)

