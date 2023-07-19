const Login = ({children}) => {

  return (
    <main className="main login page__login">
      <div className="login__container">
        <h1 className="login__title">Вход</h1>        {children}
      </div>
    </main>
  );
};

export default Login;
