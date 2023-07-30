import React, { useContext } from 'react';
import logo from '../images/header-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';

function Header({ handleLogOff }) {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1);
    }
  
    let onLinkClick = null;
    const { currentUserEmail } = useContext(CurrentUserContext);
    const { loggedIn } = useContext(AppContext);
    let location = useLocation();
    let action = '';
    let link = '';
    switch (location.pathname) {
        case '/sign-in':
            action = 'Регистрация';
            link = '/sign-up';
            break;
        case '/sign-up':
            action = 'Войти';
            link = '/sign-in';
            break;
        case '/main':
            action = 'Выйти';
            link = '/sign-in';
            onLinkClick = handleLogOff;
            break;

        default:
            action = 'Вернуться';
            link = location.pathname;
            onLinkClick = goBack;
            break;
    }
    return (
        <header className="header page__header">
            <img src={logo} alt="Логотип Место" className="logo" />
            <div className='header__navigation'>
                <p className='header__user-information'>{loggedIn ? currentUserEmail : ''}</p>
                <Link to={link} onClick={onLinkClick} className='header__link'>
                    {action}
                </Link>
            </div>
        </header>
    );
};

export default Header;


