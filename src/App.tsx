import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import Case from './pages/Case';
import Components from './pages/Components';
import Home from './pages/Home';
import Time from './pages/Time';

const App: Component = () => {
  return (
    <Router base="/merhaba">
      <Route path="/" component={Home} />
      <Route path="/zaman" component={Time} />
      <Route path="/case" component={Case} />
      <Route path="/components" component={Components} />
    </Router>
  );
};

export default App;
