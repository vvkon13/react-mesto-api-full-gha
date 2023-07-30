import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import useForm from "../hooks/useForm";

function SignInUp({ formName, title, buttonSubmitText, onSignInUp }) {
    const { loggedIn } = useContext(AppContext);
    const { values, setValues, handleChange } = useForm();

    useEffect(() => {
        setValues({
            ...values,
            userEmail: '',
            userPassword: ''
        })
    }, [loggedIn]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onSignInUp({
            password: values.userPassword,
            email: values.userEmail
        })
    }

    return (
        <section className="sign-in-up">
            <form name={formName} onSubmit={handleSubmit} className="sign-in-up__form">
                <h2 className="sign-in-up__header">{title}</h2>
                <input type="email" placeholder="Email" className="sign-in-up__input" name="userEmail"
                    minLength="7" maxLength="40" onChange={handleChange}
                    value={values.userEmail ?? ''} required />

                <input type="password" placeholder="Пароль" className="sign-in-up__input"
                    name="userPassword" minLength="5" maxLength="20"
                    value={values.userPassword ?? ''} onChange={handleChange} required />
                <button className="sign-in-up__button-submit" type="submit" >{buttonSubmitText}</button>
            </form>
        </section>
    )
}

export default SignInUp;