import React, { Component } from 'react';

import Redirect from 'react-router/Redirect';

import { client } from '../Client';

class Login extends Component {
  // leanpub-start-insert
  constructor(props) {
    super(props);

    this.state = {
      loginInProgress: false,
      shouldRedirect: false,
    };

    this.performLogin = this.performLogin.bind(this);
  }

  performLogin() {
    this.setState({ loginInProgress: true });
    client.login().then(() => (
      this.setState({ shouldRedirect: true })
    ));
  }
  // leanpub-end-insert

  render() {
    // leanpub-start-insert
    if (this.state.shouldRedirect) {
      return (
        <Redirect to='/albums' />
      );
      // leanpub-end-insert
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
                /* leanpub-start-insert */
                this.state.loginInProgress ? (
                  <div className='ui active centered inline loader' />
                ) : (
                  <div
                    className='ui large green submit button'
                    onClick={this.performLogin}
                  >
                    Login
                  </div>
                )
                /* leanpub-end-insert */
              }
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
