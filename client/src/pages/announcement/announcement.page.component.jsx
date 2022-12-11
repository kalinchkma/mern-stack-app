/**
 * announcement page
 */

import * as React from "react";

// component imports
import GameHeader from "../../components/game-header/game-header.component";
import AnnouncementCard from "./annoucemnet card/announcement-card";

// style import
import {AnnouncementContainer} from "./announcement.page.style";

// import state
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchAnnouncementStartAsync } from "../../redux/announcement/announcement.action";
import { selectAllAnnouncement } from "../../redux/announcement/announcement.select";


const AnnouncementPage = ({announcements, fetchAnnouncementStartAsync}) => {

    React.useEffect(() => {
        fetchAnnouncementStartAsync();
    }, []);
  

    return (
        <AnnouncementContainer>
            {/* =====================
            placeholder
            */}
            <div style={{height: "8px"}}></div>
            {/* 
            ===================================
            Announcements
            ===================================
            */}
                {
                    announcements && 
                    announcements.map((announcement, index)=> (

                        <AnnouncementCard key={index}  announcement={announcement}/>
                    ))
                }
           
            {/* ================================================
            placeholder
            */}
            <div style={{height: "100px"}}></div>
        </AnnouncementContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchAnnouncementStartAsync: () => dispatch(fetchAnnouncementStartAsync())
});
const mapStateToProps = createStructuredSelector({
    announcements: selectAllAnnouncement
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementPage);

