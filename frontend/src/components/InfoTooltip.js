import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";
import successImage from '../images/success.svg';
import failureImage from '../images/failure.svg';

function InfoTooltip({isOpen,isSucсess}) {
    const { closeAllPopups: onClose } = useContext(AppContext);
    usePopupClose(isOpen, onClose);
    let message ='';

    if (isSucсess) {
        message = 'Вы успешно зарегистрировались!'
    }
        else {
            message =`Что-то пошло не так! Попробуйте ещё раз.`
        }
    
    return (
        <section className={(isOpen) ?
            'popup popup_type_card popup_opened' :
            'popup popup_type_card'}>
            <div className="popup__container-info-tooltip">
                <div>
                   <img src={isSucсess ? successImage : failureImage} alt={isSucсess ? 'Успех' : 'Неудача'} className="popup__image-tooltip" />
                   <h1 className="popup__description-info-tooltip">{message}</h1>
                </div>
                <button className="popup__button-close" type="button" id="button-close-tooltip" onClick={onClose} />
            </div>
        </section>
    );
}


export default InfoTooltip;