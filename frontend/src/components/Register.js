import SignInUp from "./SignInUp";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";


export function Register({ handleRegistration }) {
    const { isLoading, loggedIn } = useContext(AppContext);
    return loggedIn ?
        <Navigate to='/main' replace /> :
        (
            <>
                <SignInUp
                    formName={'register'}
                    title={'Регистрация'}
                    buttonSubmitText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    onSignInUp={handleRegistration}
                />
                <Link to={'/sign-in'} className={'register__link'}>Уже зарегистрированы? Войти</Link>
            </>
        )
}
