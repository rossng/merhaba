import { Accessor, createSignal, Signal, type Component } from 'solid-js';
import Header from '../components/Header';
import { Results } from '../components/Results';
import { generateRandomTime, timeToTurkish } from '../time/time-utils';

const Time: Component = () => {
  const [currentTime, setCurrentTime] = createSignal<{ hour: number; minute: number }>(
    generateRandomTime()
  );
  const [userAnswer, setUserAnswer] = createSignal<{ hour: string; minute: string }>({
    hour: '',
    minute: '',
  });

  const [results, setResults] = createSignal<boolean[]>([]);

  const validUserAnswer = () =>
    Boolean(userAnswer().hour.match(/^\d+$/) && userAnswer().minute.match(/^\d+$/));

  const [state, setState] = createSignal<'question' | 'answer'>('question');

  function handleNext() {
    setCurrentTime(generateRandomTime());
    setUserAnswer({ hour: '', minute: '' });
    setState('question');
  }

  function handleSubmit() {
    const userHour = parseInt(userAnswer().hour);
    const userMinute = parseInt(userAnswer().minute);

    if (userHour === currentTime().hour && userMinute === currentTime().minute) {
      setResults([...results(), true]);
      console.log('$$ results', results());
      handleNext();
    } else {
      setResults([...results(), false]);
      console.log('$$ results', results());
      setState('answer');
    }
  }

  return (
    <div class="flex h-screen flex-col items-center">
      <Header />
      <div class="flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 p-8">
        <div class="flex h-10 w-full flex-grow items-stretch justify-between gap-8">
          <div class="w-1/2 flex-1 text-2xl font-bold">
            <LeftCard currentTime={currentTime} className="h-full" />
          </div>
          <div class="w-1/2 flex-1">
            <RightCard
              userAnswer={[userAnswer, setUserAnswer]}
              state={[state, setState]}
              className="h-full"
            />
          </div>
        </div>
        {state() === 'answer' && (
          <div class="text-xl text-red-500">
            {currentTime().hour}:{currentTime().minute.toString().padStart(2, '0')}
          </div>
        )}
        {state() === 'question' && (
          <button
            onClick={handleSubmit}
            class="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:hover:bg-gray-400"
            disabled={!validUserAnswer()}
          >
            Check
          </button>
        )}
        {state() === 'answer' && (
          <button
            onClick={handleNext}
            class="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Next
          </button>
        )}
        <Results results={results} />
      </div>
    </div>
  );
};
export default Time;

const LeftCard: Component<{
  currentTime: Accessor<{ hour: number; minute: number }>;
  className?: string;
}> = ({ currentTime, className }) => {
  return (
    <div class={`flex flex-col justify-center ${className}`}>
      <p class="text-center">{timeToTurkish(currentTime())}</p>
    </div>
  );
};

const RightCard: Component<{
  userAnswer: Signal<{ hour: string; minute: string }>;
  state: Signal<'question' | 'answer'>;
  className?: string;
}> = ({ userAnswer: [userAnswer, setUserAnswer], state: [state], className }) => {
  const disabled = () => state() === 'answer';
  return (
    <div class={`flex items-center justify-center gap-4 ${className}`}>
      <input
        type="number"
        min="1"
        max="12"
        value={userAnswer().hour}
        onInput={e => setUserAnswer({ ...userAnswer(), hour: e.currentTarget.value })}
        disabled={disabled()}
        class={`${disabled() ? 'bg-gray-200' : ''} w-24 rounded border p-2 text-center`}
        placeholder="Saat"
      />
      <span class="text-2xl">:</span>
      <input
        type="number"
        min="0"
        max="59"
        step="5"
        value={userAnswer().minute}
        onInput={e => setUserAnswer({ ...userAnswer(), minute: e.currentTarget.value })}
        disabled={disabled()}
        class={`${disabled() ? 'bg-gray-200' : ''} w-24 rounded border p-2 text-center`}
        placeholder="Dakika"
      />
    </div>
  );
};
