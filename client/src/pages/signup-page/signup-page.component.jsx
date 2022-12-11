/**
 * signup page componets
 */
/**
 * import components
 */
import GameHeader from "../../components/game-header/game-header.component";
import Signup from "../../components/signup/signup.component";

// styles imports
import {
    SignupPageContainer
} from "./signup-page.styles";

const SignupPage = () => {
    return (
        <SignupPageContainer>
            <GameHeader title={"Back"} pageLink="/" />
            {/* main signup component  */}
            <Signup />
        </SignupPageContainer>
    )
}

export default SignupPage
