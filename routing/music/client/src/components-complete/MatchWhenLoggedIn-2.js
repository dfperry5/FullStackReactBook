/* eslint-disable */
import React from 'react';

import Match from 'react-router/Match';
import Redirect from 'react-router/Redirect';

import { client } from '../Client';

const MatchWhenLoggedIn = (props) => (
  <Match {...props} render={(props) => (
    client.isLoggedIn() ? (
      // render the component
      todo
    ) : (
      // render the redirect
      todo
    )
  )} />
);

export default MatchWhenLoggedIn;
