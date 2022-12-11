/**
 * login page
 */
// import component
import GameHeader from "../../components/game-header/game-header.component";
import Login from "../../components/login/login.component";

// import styles
import { LoginPageContainer } from "./login-page.styles";


const LoginPage = () => {
    return (
        <LoginPageContainer>
            <GameHeader title={"Back"} pageLink="/" />
            <Login />
        </LoginPageContainer>
    )
}


export default LoginPage;
