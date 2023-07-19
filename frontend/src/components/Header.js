import {
  NavLink,
  useLocation
} from 'react-router-dom';
import {useState} from 'react';

function Header({
                  email,
                  singOut
                }) {
  const location = useLocation();
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    (location.pathname === "/" ? (
      <header className="header page__header header_mobile">
        <div
          className={`header__mobile-wrapper ${isMenuActive ?
            'header__mobile-wrapper_active' :
            ''}`}
        >
          <div className="header__logo"></div>
          <button
            className="header__menu-button"
            onClick={() => {
              setIsMenuActive(!isMenuActive)
            }}
          ></button>
        </div>
        <nav className="header__nav">
          <ul
            className={`header__nav-list ${isMenuActive ?
              'header__nav-list_active' :
              'header__nav-list_hidden'}`}
          >
            <li><p className="header__nav-info">{email}</p></li>
            <li>
              <button
                className="header__nav-button"
                onClick={singOut}
              >Выйти
              </button>
            </li>
            )}
          </ul>
        </nav>
      </header>
    ) : (
      <header className="header page__header">
        <div className="header__logo"></div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {location.pathname === '/sign-up' && <li className="header__nav-item"><NavLink
              className="header__nav-link hover"
              to="/sign-in"
            >Войти</NavLink></li>} {location.pathname === '/sign-in' && <li><NavLink
            className="header__nav-link hover"
            to="/sign-up"
          >Регистрация</NavLink></li>}
          </ul>
        </nav>
      </header>
    ))
  );
}

export default Header;
