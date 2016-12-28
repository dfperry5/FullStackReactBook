import React, { Component } from 'react';

// leanpub-start-insert
import Redirect from 'react-router/Redirect';
// leanpub-end-insert

import { client } from '../Client';

class Logout extends Component {

  constructor(props) {
    super(props);

    client.logout();
  }

  render() {
    return (
      <Redirect
        to='/login'
      />
    );
  }
}

export default Logout;
