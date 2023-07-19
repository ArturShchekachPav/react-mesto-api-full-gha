import {Link} from 'react-router-dom';

const Register = ({children}) => {

  return (
    <main className="main login page__login">
      <div className="login__container">
        <h1 className="login__title">Регистрация</h1>        {children}        <p className="login__text">Уже
                                                                                                          зарегистрированы? <Link
          className="login__link hover"
          to="/sign-in"
          replace
        >Войти</Link></p>
      </div>
    </main>
  );
};

export default Register;
