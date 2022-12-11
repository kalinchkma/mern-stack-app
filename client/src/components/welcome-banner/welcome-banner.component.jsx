/**
 * welcome banner
*/
// import global state
import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { selectAllConfig } from "../../redux/config/config.select";
import {Link} from "react-router-dom";

// imports styles
import { Button, Typography } from "@mui/material";
import { WelcomeBannerContainer, WelcomeBannerContent,WelcomeBannerActionBox } from "./welcome-banner.styles";

const WelcomeBanner = ({auth, configs}) => {
    return (
        <WelcomeBannerContainer>
            <WelcomeBannerContent>
            
                {
                    configs && 
                    configs.length > 0 &&
                    configs.map((config,index) =>{
                        if(config.name === "welcome") {
                            return (
                                <Typography key={index} paragraph color="text.secondary" sx={{fontSize: "14px", margin: 0}}>
                                    {config.obj}
                                </Typography>
                            )
                        }
                        return ""
                    })

                }

                <Typography sx={{fontSize: "14px", marginBottom: "5px"}}>
                    Follow us on: 
                    {
                    configs && 
                    configs.length > 0 &&
                    configs.map((config,index) =>{
                        if(config.name !== "welcome" &&
                          config.name !== 'about' && 
                          config.name !== 'term' &&
                          config.name !== 'help' &&
                          config.name !== 'images' 
                          ) {
                            return (
                               <a key={index} 
                               style={{
                                margin: "0px 5px", 
                                fontSize: "14px", 
                                textTransform: "lowercase",
                                color: "#7777ef"
                                }} 
                                href={config.obj} 
                                rel="noreferrer" 
                                target="_blank"
                                >#{config.name}</a>
                            )
                        }
                        return ""
                    })

                }
                </Typography>
                
                <WelcomeBannerActionBox>
                    {
                        auth === null &&
                        (
                        <>
                            <Button component={Link} to="/login?a=" variant="contained" color="inherit">Login</Button>
                            <Button component={Link} to="/signup" color="inherit" variant="text">signup</Button>
                        </>)
                    }
                    
                </WelcomeBannerActionBox>
            </WelcomeBannerContent>
        </WelcomeBannerContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken,
    configs: selectAllConfig
})

export default connect(mapStateToProps)(WelcomeBanner);

