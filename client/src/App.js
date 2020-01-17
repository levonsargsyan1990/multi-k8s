import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import OtherPage from './OherPage';
import Fib from './Fib';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Link to="/">
            Home
          </Link>
          <Link to="/otherpage">
            Other Page
          </Link>
        </header>
        <div>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;
