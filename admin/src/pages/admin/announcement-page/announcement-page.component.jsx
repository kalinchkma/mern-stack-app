/**
 * manage user page
 */

import * as React from 'react';

import * as Styles from "./announcement-page.style";


// component imports
import WithPreLoader from "../../../components/preloader/preloader";
import AnnouncementDataTable from "./announcement-table/announcement-table";
import PageBreadcrumbs from "../../../components/page-breadcrumbs/page-breadcrumbs";

// redux state import
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { fetchAnnouncementStartAsync } from "../../../redux/announcement/announcement.action";
import { selectAllAnnouncement, selectAnnouncementIsfetching } from "../../../redux/announcement/announcement.select";
import { selectAuthToken } from "../../../redux/auth/auth.selector";


// announcement with preloader
const AnnouncementDataTableWihtProloader = WithPreLoader(AnnouncementDataTable);

const AnnouncementPage  = ({auth, announcements, announcementIsFetching, fetchAnnouncementStartAsync}) => {

    React.useEffect(() => {
        fetchAnnouncementStartAsync();
    }, []);

    const previousLink = [["Dashboard", "/admin/"]];
    return (
    <Styles.AnnouncementConatiner>
        <PageBreadcrumbs prevLinks={previousLink} currentPage={'Announcement'} />
         { announcements && <AnnouncementDataTableWihtProloader isLoading={announcementIsFetching} rows={announcements} title="Announcement Table" />}
    </Styles.AnnouncementConatiner>
    );
        
}

const mapDispatchToProps = dispatch => ({
    fetchAnnouncementStartAsync: () => dispatch(fetchAnnouncementStartAsync())
});

const mapStateToProps = createStructuredSelector({
    announcements: selectAllAnnouncement,
    announcementIsFetching: selectAnnouncementIsfetching,
    auth: selectAuthToken
})

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage)