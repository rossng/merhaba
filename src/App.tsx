import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import Home from './pages/Home';
import Time from './pages/Time';

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/zaman" component={Time} />
    </Router>
  );
};

export default App;
