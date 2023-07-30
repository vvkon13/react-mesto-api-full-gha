import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { usePopupClose } from "../hooks/usePopupClose";

function PopupWithForm({ title, name, isOpen, onSubmit, buttonSubmitText, children }) {
    const { closeAllPopups: onClose } = useContext(AppContext);
    usePopupClose(isOpen, onClose);

    return (
        <section className={isOpen ?
            `popup popup_type_${name} popup_opened` :
            `popup popup_type_${name}`
        }>
            <div className={`popup__container-${name}`}>
                <form name={`popup-${name}`} onSubmit={onSubmit}>
                    <h2 className="popup__header">{title}</h2>
                    {children}
                    <button className="popup__button-save" type="submit" id={`button-${name}`}>{buttonSubmitText}</button>
                </form>
                <button className="popup__button-close" type="button" id={`button-close-${name}`} onClick={onClose} />
            </div>
        </section>
    );
};

export default PopupWithForm;
