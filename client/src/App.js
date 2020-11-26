import logo from './soccerball.svg';
import './App.css';
import './materialize.min.css'
import RegisterPage from './pages/registerPage';
// import { Provider } from 'react-redux';
import { Route, HashRouter, Switch } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import Profile from './pages/profilePage';
import Header from './components/header';
import { useWindowDimensions } from '../src/hooks/windows.width'
import { LanguageContext, LanguageContextProvider } from '../src/context/language'
import React, { useContext } from 'react'



const App = () => {

  const { width } = useWindowDimensions()
  // console.log(width)

  const state = useContext(LanguageContext)
  // debugger
  return (
    <HashRouter>
      <LanguageContextProvider value={state}>
        <div className='wrapper'>
          <div className="logo">
            <span className="helper"></span>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <Header />
          {width >= 900 ? <div className="leftmenu">MENU</div> : null}
          <div className="content">
            <Switch>
              <Route path='/register' render={() =>
                <RegisterPage />}
              />
              <Route path='/login' render={() =>
                <LoginPage />}
              />
              <Route path='/profile' render={() =>
                <Profile />}
              />
              <Route path='*' render={() => <div>404 not found</div>} />
              {/* <RegisterPage /> */}
            </Switch>
          </div>
          <div className="footer">FOOTER</div>
        </div>
      </LanguageContextProvider>
    </HashRouter>
  )
}

export default App;
