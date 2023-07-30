import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function ImagePopup({ card }) {
    const { closeAllPopups: onClose } = useContext(AppContext);
    usePopupClose(card?.link, onClose);

    return (
        <section className={(card.link !== "") ?
            'popup popup_type_image popup_opened' :
            'popup popup_type_image'}>
            <div className="popup__container-image">
                <figure className="popup__figure">
                    <img src={card ? card.link : ""} alt={card ? `Фото ${card.name}` : ""} className="popup__image" />
                    <figcaption className="popup__description">{card.name}</figcaption>
                </figure>
                <button className="popup__button-close" type="button" id="button-close-image" onClick={onClose} />
            </div>
        </section>
    );
}

export default ImagePopup;
