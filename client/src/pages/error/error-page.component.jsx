/**
 * Title: Error page
 */

import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    ErrorPageWrapper,
    ErrorContent
} from "./error-page.styles";


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
                <Button component={Link} to="/" sx={{
                    marginTop: "10px"
                }}>
                   <ArrowBackIcon /> Back To Home
                </Button>
            </ErrorContent>
        </ErrorPageWrapper>
    );
}

export default ErrorPage;