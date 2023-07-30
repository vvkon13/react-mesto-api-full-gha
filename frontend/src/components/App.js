import React, { useEffect, useState } from 'react';
import { api, apiAuth } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';
import PageNotFound from './PageNotFound';
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const initialStateSelectedCard = { name: "", link: "", likes: [] };
  const [selectedCard, setSelectedCard] = useState(initialStateSelectedCard);
  const [cards, setCards] = useState([]);
  const initialStateCurrentUser = { name: '', about: '', email: '' };
  const [currentUser, setCurrentUser] = useState(initialStateCurrentUser);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessStatus, setSuccessStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const tockenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      apiAuth.keyAuthentication(token)
        .then((data) => {
          setCurrentUserEmail(data.data.email);
          setLoggedIn(true);
          navigate('/main');
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }

  useEffect(() => {
    tockenCheck();
  }, []);

  function handleMountMain({ userData, iniCards }) {
    setCurrentUser(userData);
    setCards(iniCards);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(initialStateSelectedCard);
    setIsInfoTooltipOpen(false);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(() => {
        console.log('Лайк не лайк');
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => { return c._id !== card._id }));
      })
      .catch(() => {
        console.log('Произошла ошибка удаления карточки на сервере');
      });
  }

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInformation) {
    function makeRequest() {
      return api.setUserInformation(userInformation)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handleUpdateAvatar({ avatar }) {
    function makeRequest() {
      return api.updateAvatarUser(avatar)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  function handlIncreaseCards({ name, link }) {
    function makeRequest() {
      return api.addCard(name, link)
        .then((newCard) => {
          setCards([newCard, ...cards]);
        });
    }
    handleSubmit(makeRequest);
  }

  function handleLogOff() {
    setLoggedIn(false);
    setCurrentUserEmail('');
    localStorage.removeItem('token');
  }

  function handleInfoTooltip(SuccessStatus) {
    setSuccessStatus(SuccessStatus);
    setIsInfoTooltipOpen(true);
  }

  function handleRegistration({ password, email }) {
    setIsLoading(true);
    apiAuth.signUp({ password, email })
      .then(() => {
        navigate('/sign-in');
        handleInfoTooltip(true);
      })
      .catch((data) => {
        console.error(data);
        handleInfoTooltip(false);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAuthorization({ password, email }) {
    setIsLoading(true);
    apiAuth.signIn({ password, email })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setCurrentUserEmail(email);
          setLoggedIn(true);
          navigate('/main');
        }
      })
      .catch((data) => {
        console.error(data);
        handleInfoTooltip(false);
      })
      .finally(() => setIsLoading(false));
  }


  return (

    <div className="page">
      <AppContext.Provider value={{ isLoading, closeAllPopups, loggedIn }}>
        <CurrentUserContext.Provider value={{ currentUser, currentUserEmail }}>
          <Header
            handleLogOff={handleLogOff}
          />
          <Routes>
            <Route path="/main"
              element=
              {<ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                handleMountMain={handleMountMain}
              />
              }
            />
            <Route path="/sign-in" element={<Login handleAuthorization={handleAuthorization} />} />
            <Route path="/sign-up" element={<Register handleRegistration={handleRegistration} />} />
            <Route path="/" element={loggedIn ? <Navigate to='/main' /> : <Navigate to='/sign-in' replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onIncreaseCards={handlIncreaseCards}
          />
          <ImagePopup card={selectedCard} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="card-deletion"
            isOpen={false}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSucсess={isSuccessStatus}
          />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
};

export default App;

