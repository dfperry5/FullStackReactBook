import React from 'react';

import Match from 'react-router/Match';
// leanpub-start-insert
import Redirect from 'react-router/Redirect';
// leanpub-end-insert

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-2';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Match pattern='/albums' component={AlbumsContainer} />

      {/* leanpub-start-insert */}
      <Match exactly pattern='/' render={() => (
        <Redirect
          to='/albums'
        />
      )} />
      {/* leanpub-end-insert */}
    </div>
  </div>
);

export default App;
