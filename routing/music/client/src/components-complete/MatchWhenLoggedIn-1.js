import React from 'react';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

import { client } from '../Client';

const MatchWhenLoggedIn = (props) => (
  <Match {...props} />
);

export default MatchWhenLoggedIn;
