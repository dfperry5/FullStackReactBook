import React from 'react';

// leanpub-start-insert
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import Redirect from 'react-router/Redirect';
// leanpub-end-insert

const App = () => (
  <Router>
    <div
      className='ui text container'
    >
      <h2 className='ui dividing header'>
        Which body of water?
      </h2>

      <ul>
        <li>
          <Link to='/atlantic'>
            <code>/atlantic</code>
          </Link>
        </li>
        <li>
          <Link to='/pacific'>
            <code>/pacific</code>
          </Link>
        </li>
        <li>
          <Link to='/black-sea'>
            <code>/black-sea</code>
          </Link>
        </li>
      </ul>

      <hr />

      <Match pattern='/atlantic' component={Atlantic} />
      {/* leanpub-start-insert */}
      <Match pattern='/atlantic/ocean' render={() => (
        <div>
          <h3>Atlantic Ocean — Again!</h3>
          <p>
            The Atlantic Ocean covers approximately 29% of
            the world's water surface area.
          </p>
        </div>
      )} />
      {/* leanpub-end-insert */}
      <Match pattern='/pacific' component={Pacific} />
      <Match pattern='/black-sea' component={BlackSea} />

      {/* This solution is problematic */}
      <Match pattern='/' render={() => (
        <h3>
          Welcome! Select a body of saline water above.
        </h3>
      )} />
    </div>
  </Router>
);

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
    </p>
  </div>
);

class BlackSea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 3,
    };
  }

  componentDidMount() {
    setInterval(() => (
      this.setState({ counter: this.state.counter - 1 })
    ), 1000);
  }

  render() {
    return (
      <div>
        <h3>Black Sea</h3>
        <p>Nothing to sea [sic] here ...</p>
        <p>Redirecting in {this.state.counter}...</p>
        {
          (this.state.counter < 1) ? (
            <Redirect to='/' />
          ) : null
        }
      </div>
    );
  }
}

export default App;
