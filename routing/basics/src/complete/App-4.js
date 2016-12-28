import React from 'react';

import createHistory from 'history/createBrowserHistory';

const Match = ({ pattern, component: Component }, { location }) => {
  const pathname = location.pathname;
  if (pathname.match(pattern)) {
    return (
      <Component />
    );
  } else {
    return null;
  }
};

Match.contextTypes = {
  location: React.PropTypes.object,
};

const Link = ({ to, children }, { history }) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to}
  >
    {children}
  </a>
);

Link.contextTypes = {
  history: React.PropTypes.object,
};

// leanpub-start-insert
class Redirect extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object,
  }

  componentDidMount() {
    const history = this.context.history;
    const to = this.props.to;
    history.push(to);
  }

  render() {
    return null;
  }
}
// leanpub-end-insert

class Router extends React.Component {

  static childContextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.history = createHistory();
    this.history.listen(() => this.forceUpdate());
  }

  getChildContext() {
    return {
      history: this.history,
      location: window.location,
    };
  }

  render() {
    return this.props.children;
  }
}

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
        {/* leanpub-start-insert */}
        <li>
          <Link to='/black-sea'>
            <code>/black-sea</code>
          </Link>
        </li>
        {/* leanpub-end-insert */}
      </ul>

      <hr />

      <Match pattern='/atlantic' component={Atlantic} />
      <Match pattern='/pacific' component={Pacific} />
      {/* leanpub-start-insert */}
      <Match pattern='/black-sea' component={BlackSea} />
      {/* leanpub-end-insert */}
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

// leanpub-start-insert
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
  // leanpub-start-insert
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
