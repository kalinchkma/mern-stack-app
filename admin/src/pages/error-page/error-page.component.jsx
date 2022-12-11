/**
 * Title: Error page
 */

import { Typography } from "@mui/material";
import {
    ErrorPageWrapper,
    ErrorContent
} from "./error-page.styles";
import {Link} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ErrorPage = () => {
    return (
        <ErrorPageWrapper>
            <ErrorContent>
                <Typography variant="h1" >
                    404
                </Typography>
                <Typography variant="h3">
                    Opps Sorry!
                </Typography>
                <Typography variant="p">
                    Page Not found
                </Typography>
                <Link style={{marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center"}} to="/" ><ArrowBackIcon /> Go Back</Link>
            </ErrorContent>
        </ErrorPageWrapper>
    );
}

export default ErrorPage;