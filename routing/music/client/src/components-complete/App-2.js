import React from 'react';

import Match from 'react-router/Match';

import TopBar from './TopBar';
import AlbumsContainer from './AlbumsContainer-2';

import '../styles/App.css';

const App = () => (
  <div className='ui grid'>
    <TopBar />
    <div className='spacer row' />
    <div className='row'>
      <Match pattern='/albums' component={AlbumsContainer} />
    </div>
  </div>
);

export default App;
