import React from 'react';

// leanpub-start-insert
import Match from 'react-router/Match';
// leanpub-end-insert

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-1';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      {/* leanpub-start-insert */}
      <Match pattern='/albums' component={AlbumsContainer} />
      {/* leanpub-end-insert */}
    </div>
  </div>
);

export default App;
