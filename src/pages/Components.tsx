import { Component } from 'solid-js';
import { Results } from '../components/Results';

const Components: Component = () => {
  return (
    <div>
      <Results
        results={() => [true, false, false, false, true, true, false, false, false, false, false]}
      />
    </div>
  );
};
export default Components;
