import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const { currentUser } = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `card__button-like ${isLiked && 'card__button-like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    }
console.log(isOwn);
    return (
        <>
            <img src={card.link} alt={`Фото ${card.name}`} className="card__photo" onClick={handleClick} />
            <div className="card__description">
                <h2 className="card__name">{card.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <p className="card__quantity-like">{card.likes.length}</p>
                </div>
            </div>
            {isOwn && <button className="card__button-remove" type="button" onClick={handleDeleteClick} />}
        </>
    );
};

export default Card;