/* eslint-disable no-constant-condition */
import React, { Component } from 'react';

import Redirect from 'react-router/Redirect';

import { client } from '../Client';

class Login extends Component {
  render() {
    if ('todo') {
      return (
        'todo'
      );
    } else {
      return (
        <div className='ui one column centered grid'>
          <div className='ten wide column'>
            <div
              className='ui raised very padded text container segment'
              style={{ textAlign: 'center' }}
            >
              <h2 className='ui green header'>
                Notify
              </h2>
              {
                /* todo */
              }
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
