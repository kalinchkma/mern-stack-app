/**
 * home page banner
 */
import { useState } from "react";

import {connect} from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAuthToken } from "../../redux/auth/auth.selector";
import { selectAllConfig } from "../../redux/config/config.select";

// components imports
import SliderSystem from "../slider-system/slider.component";



// styles imports
import { BannerContainer, HomeHeader, BrandLogo,WelcomeText} from "./home-banner-slider.styles";

const HomePageBanner = ({auth, configs}) => {
    let images = null;
    if(configs && configs.length > 0) {
        configs.forEach(config => {
            if(config.name === "images" && JSON.parse(config.obj).length > 0) {
                images = JSON.parse(config.obj);
            }
        });
    }

    return (
        <BannerContainer>
            <HomeHeader>
                <BrandLogo to="/">
                    <img  src='/images/logo.png' alt='' />
                </BrandLogo>
                <WelcomeText>Welcome <span>{auth !== null && auth.name ? auth.name : "Gamer"}</span></WelcomeText>
                
            </HomeHeader>
            <SliderSystem dot={false} itemToShow={1} >

                        {
                            images &&
                            typeof images === "object" &&
                            images.map((image) => (
                                    <img 
                                    key={image} 
                                    style={{
                                        width: "100% !important",
                                        height: "100% !important",
                                        objectFit: "cover"
                                    }} src={image} alt=""/>
                            ))
                        }
                
                   
                        
                        {/* <div className="box" style={{
                        width: "100% !important",
                        height: "100% !important"
                        }}>
                            <img style={{
                                width: "100% !important",
                                height: "100% !important",
                                objectFit: "cover"
                            }} src="/images/pubg.jpg" alt=""/>

                        </div>

                        <div className="box"
                         style={{
                            width: "100% !important",
                            height: "100% !important"
                         }}
                        >
                                <img
                                style={{
                                    width: "100% !important",
                                    height: "100% !important",
                                    objectFit: "cover"
                                
                                }}
                                src="/images/free-fire.jpg" alt=""/>
                        </div>

                        <div className="box"
                        style={{
                            width: "100% !important",
                            height: "100% !important"
                        }}
                        >
                            <img
                                style={{
                                    width: "100% !important",
                                    height: "100% !important",
                                    objectFit: "cover"
                                }}
                            src="/images/ml.jpg" alt=""/>
                        </div> */}
                   
                

               

            </SliderSystem>
        </BannerContainer>
    )
}
const mapStateToProps = createStructuredSelector({
    auth: selectAuthToken,
    configs: selectAllConfig
});

const mapDispatchToProps = dispatch => ({
   
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePageBanner);