import logo from './soccerball.svg';
import './App.css';
import './materialize.min.css'
import RegisterPage from './pages/registerPage';
// import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom'
import LoginPage from './pages/loginPage'

const App = () => {
  return (
    <HashRouter>
      <div className='wrapper'>
        <div className="logo">
          <span className="helper"></span>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="header">HEADER</div>
        {window.innerWidth >= 900 ? <div className="leftmenu">MENU</div> : null}
        <div className="content">
          <Switch>
            <Route path='/register' render={() =>
              <RegisterPage />}
            />
            <Route path='/login' render={() =>
              <LoginPage />}
            />
            <Route path='*' render={() => <div>404 not found</div>} />
            {/* <RegisterPage /> */}
          </Switch>
        </div>
        <div className="footer">FOOTER</div>
      </div>
    </HashRouter>
  )
}

export default App;
