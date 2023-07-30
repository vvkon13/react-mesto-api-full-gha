import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useForm from "../hooks/useForm";
import { AppContext } from "../contexts/AppContext";


function EditProfilePopup({ isOpen, onUpdateUser }) {
    const {currentUser} = useContext(CurrentUserContext);
    const { isLoading } = useContext(AppContext);

    const { values, setValues, handleChange } = useForm();

    useEffect(() => {
        if (isOpen) {
            setValues({
                ...values,
                profileName: currentUser.name,
                profileDescription: currentUser.about
            });
        }
    }, [currentUser, isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: values['profileName'],
            about: values['profileDescription']
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonSubmitText={isLoading ? 'Сохранение...' : 'Сохранить'}
        >
            <input type="text" placeholder="Имя" className="popup__input popup__input_type_name" name="profileName"
                minLength="2" maxLength="40" id="popup-name" onChange={handleChange}
                value={values['profileName'] ?? ''} required />
            <span className="popup__input-error" id="popup-name-error">сообщение об ошибке</span>

            <input type="text" placeholder="О себе" className="popup__input popup__input_type_description"
                name="profileDescription" minLength="2" maxLength="200" id="popup-description"
                value={values['profileDescription'] ?? ''} onChange={handleChange} required />
            <span className="popup__input-error" id="popup-description-error">сообщение об ошибке</span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;