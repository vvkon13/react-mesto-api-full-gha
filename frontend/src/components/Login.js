import SignInUp from "./SignInUp";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Navigate } from 'react-router-dom';

export function Login({ handleAuthorization }) {
    const { isLoading, loggedIn } = useContext(AppContext);


    return loggedIn ?
        <Navigate to='/main' replace /> :
        (
            <>
                <SignInUp
                    formName={'login'}
                    title={'Вход'}
                    buttonSubmitText={isLoading ? 'Вход...' : 'Войти'}
                    onSignInUp={handleAuthorization}
                />
            </>
        )
}
