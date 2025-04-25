import { type Component, Accessor } from 'solid-js';

export const Results: Component<{ results: Accessor<boolean[]> }> = ({ results }) => {
  const runs = () => {
    const runs: [boolean, number][] = [];
    if (results().length > 0) {
      let currentValue = results()[0];
      let count = 1;

      for (let i = 1; i < results().length; i++) {
        if (results()[i] === currentValue) {
          count++;
        } else {
          runs.push([currentValue, count]);
          currentValue = results()[i];
          count = 1;
        }
      }
      runs.push([currentValue, count]);
    }
    return runs;
  };

  return (
    <div class="flex h-10 flex-row items-stretch gap-2">
      {runs().map(([value, count], index) => (
        <Run value={value} count={count} />
      ))}
    </div>
  );
};

const Run: Component<{ value: boolean; count: number }> = ({ value, count }) => {
  return count > 3 ? (
    <div
      class={`flex flex-row items-start gap-2 ${value ? 'bg-green-700' : 'bg-red-700'} rounded-sm p-2 font-mono text-white`}
    >
      <span>{value ? '✓' : '✗'}</span>
      <span>{count}</span>
    </div>
  ) : (
    <div class={`flex flex-row items-stretch gap-0.5`}>
      {Array(count)
        .fill(0)
        .map(() => (
          <div
            class={`p-2 ${value ? 'bg-green-700' : 'bg-red-700'} rounded-sm font-mono text-white`}
          >
            {value ? '✓' : '✗'}
          </div>
        ))}
    </div>
  );
};
