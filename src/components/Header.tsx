import { A } from '@solidjs/router';
import type { Component } from 'solid-js';

const Header: Component = () => {
  return (
    <header class="w-full p-4 text-center">
      <A href="/">
        {' '}
        <h1 class="text-4xl font-extrabold">Merhaba</h1>
      </A>
      <p>Turkish learning tools</p>
    </header>
  );
};

export default Header;
