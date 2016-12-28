import React, { Component } from 'react';

import Redirect from 'react-router/Redirect';

import { client } from '../Client';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginInProgress: false,
      shouldRedirect: false,
    };

    this.performLogin = this.performLogin.bind(this);
    // leanpub-start-insert
    this.redirectPath = this.redirectPath.bind(this);
    // leanpub-end-insert
  }

  performLogin() {
    this.setState({ loginInProgress: true });
    client.login().then(() => (
      this.setState({ shouldRedirect: true })
    ));
  }

  // leanpub-start-insert
  redirectPath() {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || '/albums';
  }
  // leanpub-end-insert

  render() {
    if (this.state.shouldRedirect) {
      return (
        // leanpub-start-insert
        <Redirect to={this.redirectPath()} />
        // leanpub-end-insert
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
                this.state.loginInProgress ? (
                  <div className='ui active centered inline loader' />
                ) : (
                  <div
                    className='ui fluid large green submit button'
                    onClick={this.performLogin}
                  >
                    Login
                  </div>
                )
              }
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Login;
