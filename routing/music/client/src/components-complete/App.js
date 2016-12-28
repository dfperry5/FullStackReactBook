import React from 'react';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';
import Miss from 'react-router/Miss';

import TopBar from './TopBar';
// leanpub-start-insert
import MatchWhenLoggedIn from './MatchWhenLoggedIn';
// leanpub-end-insert
import AlbumsContainer from './AlbumsContainer';
import Login from './Login';
import Logout from './Logout';

import '../styles/App.css';

const NoMatch = ({ location }) => (
  <div className='ui inverted red raised very padded text container segment'>
    <strong>Error!</strong> No route found matching:
    <div className='ui inverted black segment'>
      <code>{location.pathname}</code>
    </div>
  </div>
);

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      {/* leanpub-start-insert */}
      <MatchWhenLoggedIn pattern='/albums' component={AlbumsContainer} />
      {/* leanpub-end-insert */}
      <Match pattern='/login' component={Login} />
      <Match pattern='/logout' component={Logout} />

      <Match exactly pattern='/' render={() => (
        <Redirect
          to='/albums'
        />
      )} />

      <Miss component={NoMatch} />
    </div>
  </div>
);

export default App;
