/**
 * Title: Login Register page component
 */

import React from "react";

import { useNavigate } from "react-router-dom";

import LoginComponent  from "../../components/login/login.component";
import { LoginContainer } from "./login-page.styles";

// redux state imports
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect"; 
import { selectAuthToken } from "../../redux/auth/auth.selector";

const LoginPage = ({auth}) => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if(auth) {
            navigate("/admin");
        }
    }, []);

    return (
        <LoginContainer>
            <LoginComponent />
        </LoginContainer>
    )
}

const mapStateTopProps = createStructuredSelector({
    auth: selectAuthToken
});

export default connect(mapStateTopProps)(LoginPage);





