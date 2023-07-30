import { useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const avatarLinkRef = useRef();
  const { isLoading } = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLinkRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonSubmitText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input type="url" placeholder="Ссылка на аватар" className="popup__input popup__input_type_name"
        name="popup-avatar-link" id="popup-avatar-link" ref={avatarLinkRef} required />
      <span className="popup__input-error" id="popup-avatar-link-error">сообщение об ошибке</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;