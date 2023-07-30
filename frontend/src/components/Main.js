import React, { useEffect, useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';
import {api} from '../utils/Api';


function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, handleMountMain }) {
    const { currentUser } = useContext(CurrentUserContext);
    
    useEffect(() => {
        Promise.all([api.getUserInformation(), api.getInitialCards()])
          .then(([userData, iniCards]) => {
            handleMountMain({userData, iniCards});
          })
          .catch(() => {
            console.log('Информация о пользователе не загружена');
            console.log('Карточки не загружены. Произошла ошибка');
          });
      }, []);
    

    return (
        <>
            <main className="content page__content">

                <section className="profile content__profile">
                    <div className="profile__main">
                        <div className="profile__photo-place">
                            <div className="profile__photo-wrapper">
                                <img src={currentUser.avatar} alt="Фото Профиль" className="profile__photo" onClick={onEditAvatar} />
                            </div>
                        </div>
                        <div className="profile__info">
                            <div className="profile__string-and-button">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
                            </div>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
                </section>

                <section className="content__elements">
                    <ul className="elements">
                        {
                            cards.map((card) => {
                                return (
                                    <li className="card elements__item" key={card._id}>
                                        <Card
                                            card={card}
                                            onCardClick={onCardClick}
                                            onCardLike={onCardLike}
                                            onCardDelete={onCardDelete}
                                        />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>

            </main >
            <Footer />
        </>
    );
};

export default Main;