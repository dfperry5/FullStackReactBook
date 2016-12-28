import React from 'react';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-3';
import Login from './Login-1';
import Logout from './Logout';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Match pattern='/albums' component={AlbumsContainer} />

      {/* leanpub-start-insert */}
      <Match pattern='/login' component={Login} />
      <Match pattern='/logout' component={Logout} />
      {/* leanpub-end-insert */}

      <Match exactly pattern='/' render={() => (
        <Redirect
          to='/albums'
        />
      )} />
    </div>
  </div>
);

export default App;
