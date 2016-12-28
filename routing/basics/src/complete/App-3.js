import React from 'react';

import createHistory from 'history/createBrowserHistory';

// leanpub-start-delete
const history = createHistory();
// leanpub-end-delete

// leanpub-start-insert
const Match = ({ pattern, component: Component }, { location }) => {
  const pathname = location.pathname;
  // leanpub-end-insert
  if (pathname.match(pattern)) {
    return (
      <Component />
    );
  } else {
    return null;
  }
};

// leanpub-start-insert
Match.contextTypes = {
  location: React.PropTypes.object,
};
// leanpub-end-insert


// leanpub-start-insert
const Link = ({ to, children }, { history }) => (
  // leanpub-end-insert
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

// leanpub-start-insert
Link.contextTypes = {
  history: React.PropTypes.object,
};
// leanpub-end-insert

// leanpub-start-insert
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
// leanpub-end-insert

// leanpub-start-insert
const App = () => (
  <Router>
    {/* leanpub-end-insert */}
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
      </ul>

      <hr />

      <Match pattern='/atlantic' component={Atlantic} />
      <Match pattern='/pacific' component={Pacific} />
    </div>
  {/* leanpub-start-insert */}
  </Router>
);
// leanpub-end-insert

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

export default App;
