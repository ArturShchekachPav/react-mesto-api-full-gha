import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import {
  useState,
  useEffect
} from 'react';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltipPopup from './InfoTooltipPopup';
import AuthForm from './AuthForm';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [formAuthValue, setFormAuthValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
      if (isLoggedIn) {
        Promise.all([api.getInitialCards(),
          api.getProfileData()
        ])
          .then(([cards, userData]) => {
            setCards(cards);

            setCurrentUser(userData);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    [isLoggedIn]
  );

  const handleTokenCheck = () => {
    api.checkToken()
      .then((res) => {
        setIsLoggedIn(true);
        setUserEmail(res.email);
        navigate('/',
          {replace: true}
        );
      })
      .catch(error => {
        console.log(error);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
      handleTokenCheck();
    },
    []
  );

  function handleRegister() {
    setIsLoading(true);
    return api.register(formAuthValue.email,
      formAuthValue.password
    )
      .then(() => {
        setInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);

        setFormAuthValue({
          email: '',
          password: ''
        });
      })
      .catch((error) => {
        console.log(error);

        setInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAuthorize() {
    setIsLoading(true);
    return api.authorize(formAuthValue.email,
      formAuthValue.password
    )
      .then(() => {
        setInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);

        setFormAuthValue({
          email: '',
          password: ''
        });
      })
      .catch((error) => {
        console.log(error);

        setInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id,
      isLiked
    )
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ?
          newCard :
          c));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleCardDeleteClick(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleCardDelete() {
    const isOwn = cardToDelete.owner === currentUser._id;

    api.deleteCard(cardToDelete._id,
      isOwn
    )
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser({
                              name,
                              about
                            }) {

    setIsLoading(true);

    api.editProfileData(name,
      about
    )
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);

    api.editAvatar(avatar)
      .then((newUserData) => {
        setCurrentUser(newUserData);

        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(name,
                                link
  ) {
    setIsLoading(true);

    api.postNewCard(name,
      link
    )
      .then((newCard) => {
        setCards([newCard,
          ...cards
        ]);

        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleSingOut() {
    api.singOut()
      .then(() => {
        setIsLoggedIn(false);
        navigate('/sign-in',
          {replace: true}
        );
      })
      .catch(err => {
        console.log(err);
      });

  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleTokenCheck();
  };

  if (isLoggedIn === null) {
    return (
      <main className="main login page__login">
        <div className="login__container">
          <h1 className="login__title">Загрузка...</h1>
        </div>
      </main>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          singOut={handleSingOut}
        /> <Routes> <Route
        path="/sign-up"
        element={
          <>
            <Register> <AuthForm
              setFormValue={setFormAuthValue}
              onSubmit={handleRegister}
              formValue={formAuthValue}
              buttonText="Зарегистрироваться"
              isLoading={isLoading}
            /> </Register> <InfoTooltipPopup
            isOpen={isInfoTooltipOpen}
            status={infoTooltipStatus}
            onClose={closeAllPopups}
            successAction={() => {
              navigate('/sign-in',
                {replace: true}
              );
            }
            }
          />
          </>
        }
      /> <Route
        path="/sign-in"
        element={
          <>
            <Login> <AuthForm
              setFormValue={setFormAuthValue}
              onSubmit={handleAuthorize}
              formValue={formAuthValue}
              buttonText="Войти"
              isLoading={isLoading}
            /> </Login> <InfoTooltipPopup
            isOpen={isInfoTooltipOpen}
            status={infoTooltipStatus}
            onClose={closeAllPopups}
            successAction={() => {
              handleLogin();
              navigate('/',
                {replace: true}
              );
            }
            }
          />
          </>
        }
      /> <Route
        path="/"
        element={
          <ProtectedRoute
            element={
              <>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                  cards={cards}
                /> <EditProfilePopup
                isLoading={isLoading}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
              /> <AddPlacePopup
                isLoading={isLoading}
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
              /> <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
              /> <ConfirmDeleteCardPopup
                isOpen={isConfirmDeletePopupOpen}
                onClose={closeAllPopups}
                onConfirmDelete={handleCardDelete}
              /> <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
              />
              </>
            }
            isLoggedIn={isLoggedIn}
          />
        }
      /> <Route
        path="/*"
        element={
          <main className="main login page__login">
            <div className="login__container">
              <h1 className="login__title">404 Not found</h1>
            </div>
          </main>
        }
      /> </Routes> <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
