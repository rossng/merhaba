import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import Components from './pages/Components';
import Home from './pages/Home';
import Time from './pages/Time';

const App: Component = () => {
  return (
    <Router base="/merhaba">
      <Route path="/" component={Home} />
      <Route path="/zaman" component={Time} />
      <Route path="/components" component={Components} />
    </Router>
  );
};

export default App;
