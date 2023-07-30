import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

function AddPlacePopup({ isOpen, onIncreaseCards }) {
  const { values, handleChange, setValues } = useForm();
  const cardName = "popup-card-title";
  const cardLink = "popup-card-link";
  const { isLoading } = useContext(AppContext);

  useEffect(() => {
    setValues({
      ...values,
      [cardName]: '',
      [cardLink]: ''
    })
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onIncreaseCards({
      name: values[cardName],
      link: values[cardLink]
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonSubmitText={isLoading ? 'Вставляем...' : 'Вставить'}
    >
      <input type="text" placeholder="Название" className="popup__input popup__input_type_name" name={cardName}
        minLength="2" maxLength="30" id="popup-card-title" value={values[cardName] ?? ''} onChange={handleChange} required />
      <span className="popup__input-error" id="popup-card-title-error">сообщение об ошибке</span>
      <input type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_type_description"
        name={cardLink} id="popup-card-link" value={values[cardLink] ?? ''} onChange={handleChange} required />
      <span className="popup__input-error" id="popup-card-link-error">сообщение об ошибке</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup
